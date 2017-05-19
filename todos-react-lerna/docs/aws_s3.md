aws s3 sync ./dist s3://wubil-todos-deploy/dist --delete --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

- sync 命令还可以接受 --acl 选项，使用该选项可以设置对复制到 Amazon S3 中的文件的访问权限。该选项接受 private、public-read 和 public-read-write 值。
  ```
  aws s3 sync ./dist s3://wubil-todos-deploy/public --delete --acl public-read
  ```

- 当 --recursive 选项与 cp、mv 或 rm 一起用于目录/文件夹时，命令会遍历目录树，包括所有子目录。与 sync 命令相同，这些命令也接受 --exclude、--include 和 --acl 选项。
  ```
  aws s3 sync . s3://wubil-todos-deploy/public --delete --acl public-read --exclude '*' --include '*.html'
  ```  