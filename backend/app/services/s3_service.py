import boto3
from botocore.exceptions import ClientError
from app.config import get_settings
import logging
from uuid import uuid4

logger = logging.getLogger(__name__)
settings = get_settings()

class S3Service:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
            region_name=settings.aws_region
        )
        self.bucket_name = settings.s3_bucket_name

    async def upload_file(self, file, folder="uploads"):
        """Upload file to S3 and return URL"""
        try:
            # Generate unique key
            file_extension = file.filename.split('.')[-1]
            key = f"{folder}/{uuid4()}.{file_extension}"

            # Upload to S3
            self.s3_client.upload_fileobj(
                file.file,
                self.bucket_name,
                key,
                ExtraArgs={'ContentType': file.content_type}
            )

            # Generate presigned URL (valid for 1 hour)
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': key},
                ExpiresIn=3600
            )

            logger.info(f"File uploaded successfully: {key}")

            return {
                "key": key,
                "url": url,
                "bucket": self.bucket_name
            }

        except ClientError as e:
            logger.error(f"S3 upload error: {str(e)}")
            raise Exception(f"Failed to upload file: {str(e)}")

# Create singleton instance
s3_service = S3Service()
