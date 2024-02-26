<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">

    <title><?= $site->title() ?></title>

    <link rel="apple-touch-icon" sizes="180x180" href="<?= $site->url() ?>/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= $site->url() ?>/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= $site->url() ?>/favicon-16x16.png">
    <link rel="manifest" href="<?= $site->url() ?>/site.webmanifest">
    <link rel="mask-icon" href="<?= $site->url() ?>/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <?= css([
      'assets/css/main.css',
      '@auto'
    ]) ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <?php if($page->template() == 'about'): ?>
      <script language="JavaScript" src="<?= $site->url() ?>/assets/js/JSFX_Layer.js"></script>
      <script language="JavaScript" src="<?= $site->url() ?>/assets/js/JSFX_Mouse.js"></script>
      <script language="JavaScript" src="<?= $site->url() ?>/assets/js/JSFX_TextFlag.js"></script>
    <?php endif ?>
  </head>
  <body class="<?= $page->template() ?>">

    <?php if($page->template() == 'home'): ?>
    <div id="loader" class="load">
      <video autoplay muted loop playsinline crossorigin="anonymous"
      poster="<?= $site->url() ?>/assets/video/dragons-loader.jpg">
          <source src="<?= $site->url() ?>/assets/video/dragons-loader.mp4" type="video/mp4">
      </video>
    </div>
    <?php endif ?>

    <main id="main"<?php if($page->template() == 'home' ): ?> class="home"<?php endif ?>>
      <header id="header">
        <a href="<?= $site->url() ?>"><img class="logo" src="<?= $site->url() ?>/assets/logo/LOGO-DOUBLE-DRAGON-WHITE.svg"></a>
      </header>

      <div class="nav left">
        <?php if($page->template() == 'index'): ?><a href="<?= $site->url() ?>">
            Close
          </a>
          <?php else: ?><a href="<?= $site->url() ?>/index">
            Index
            </a><?php endif ?>
      </div>

      <div class="nav right">
        <?php if($page->template() == 'about'): ?><a href="<?= $site->url() ?>">
          Close
        </a>
        <?php else: ?><a href="<?= $site->url() ?>/about">
          About
        </a><?php endif ?>
      </div>