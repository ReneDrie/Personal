<?php

class HttpHelper
{
    public static function isHttps()
    {
        if (!empty($_SERVER['HTTPS']))
        {
            return true;
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')
        {
            return true;
        }
        if (!empty($_SERVER['PORT']) && $_SERVER['PORT'] == 443)
        {
            return true;
        }

        return false;
    }

    public static function getProtocol()
    {
        return self::isHttps() ? 'https:' : 'http:';
    }

    public static function getBasePath()
    {
        return self::getProtocol() . '//' . $_SERVER['HTTP_HOST'] . substr($_SERVER['SCRIPT_NAME'], 0, strrpos($_SERVER['SCRIPT_NAME'], '/')) . '/';
    }
}

$basepath = HttpHelper::getBasePath();

?><!doctype html>
<!--[if IE 8]> <html class="no-js lt-ie10 lt-ie9"> <![endif]-->
<!--[if IE 9]><html class="no-js lt-ie10"><![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width" />

	<title>Personal</title>

    <!-- change this path to cdn or append version folder -->
    <base href="<?php echo $basepath ?>" />

	<link href="inc/style/screen.css" rel="stylesheet" type="text/css" />

	<script src="inc/script/lib/modernizr/modernizr.js"></script>
</head>
<body>

    <span class="canvas-background"><canvas width="100%" height="100%"></canvas></span>

    <section class="wrapper">

        <div class="page page-home">

            <h1 class="logo-main">
                <span class="ir">René Drieënhuizen - Front-end Webdeveloper</span>
                <em class="sub-title">Front end web developer</em>

                <span class="letter letter-r">
                    <span class="sprite r-01"></span>
                    <span class="sprite r-02"></span>
                    <span class="sprite r-03"></span>
                    <span class="sprite r-04"></span>
                    <span class="sprite r-05"></span>
                </span>
                <span class="letter letter-e">
                    <span class="sprite e-01"></span>
                    <span class="sprite e-02"></span>
                    <span class="sprite e-03"></span>
                </span>
                <span class="letter letter-n">
                    <span class="sprite n-01"></span>
                    <span class="sprite n-02"></span>
                    <span class="sprite n-03"></span>
                    <span class="sprite n-04"></span>
                </span>
                <span class="letter letter-e">
                    <span class="sprite e-01"></span>
                    <span class="sprite e-02"></span>
                    <span class="sprite e-03"></span>
                </span>

                <span class="lines">
                    <span class="line line-vertical line-01">
                        <span class="sprite l-01"></span>
                        <span class="sprite l-02"></span>
                    </span>
                    <span class="line line-vertical line-02">
                        <span class="sprite l-01"></span>
                        <span class="sprite l-02"></span>
                    </span>
                    <span class="line line-horizontal line-03">
                        <span class="sprite l-01"></span>
                        <span class="sprite l-02"></span>
                        <span class="sprite l-03"></span>
                        <span class="sprite l-04"></span>
                    </span>
                    <span class="line line-horizontal line-04">
                        <span class="sprite l-01"></span>
                        <span class="sprite l-02"></span>
                        <span class="sprite l-03"></span>
                        <span class="sprite l-04"></span>
                    </span>
                </span>
            </h1>

        </div>
        <div class="page"></div>
        <div class="page"></div>

    </section>

    <a class="mailto" href="moc.neziuhneeirdener@nebki:otliam" title="Get in touch">moc.neziuhneeirdener@nebki</a>
    <p class="scroll-text">
        <span class="text">Scroll for more</span>
        <span class="scroll-mouse"><i class="scroll-arrow icon-mouse-arrow"></i></span>
    </p>

    <!--<div class="scroll-area"></div>-->

    <!-- build:js inc/script/app/Main.js -->
	<script src="inc/script/lib/require/require.js"></script>
	<script src="inc/script/app/Bootstrap.js"></script>
    <!-- endbuild -->

</body>
</html>