data "aws_iam_policy_document" "allow_public_access" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = ["s3:*"]

    resources = [
      "${aws_s3_bucket.greenscape_bucket.arn}/products/*",
    ]
  }
}

resource "aws_s3_bucket" "greenscape_bucket" {
  bucket        = "greenscape-buck"
  force_destroy = true
}

resource "aws_s3_object" "products_folder" {
  bucket = aws_s3_bucket.greenscape_bucket.id
  key    = "products/"
}

resource "aws_s3_bucket_policy" "greenscape_s3_bucket_policy" {
  bucket = aws_s3_bucket.greenscape_bucket.id
  policy = data.aws_iam_policy_document.allow_public_access.json
}

resource "aws_s3_bucket_public_access_block" "greenscape_s3_bucket_public_access" {
  bucket                  = aws_s3_bucket.greenscape_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
