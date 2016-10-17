<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>NewsReleaseSystem</title>
    <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js" charset="utf-8"></script>
    <script src="http://shinedata.chinaeid.cn/lib/ckeditor/ckeditor.js" charset="utf-8"></script>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
  <script type="text/javascript">
  window.onload = function(){
   CKEDITOR.replace( 'ckEditor', {
                    language: 'zh-cn',
                    filebrowserUploadUrl: "http://ccqr.themistech.cn:80/servlet/UploadServerlet?type=image"
                  });
  };

  </script>
</html>
