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

  <main id="main">
    <header id="header">
      <?php if($page->template() == 'index'): ?>
        <a href="<?= $site->url() ?>" class="nav">Close</a>
      <?php else: ?>
      <a href="<?= $site->url() ?>/index" class="nav">Index</a>
      <?php endif ?>
      <a href="<?= $site->url() ?>"><img class="logo" src="<?= $site->url() ?>/assets/logo/LOGO-DOUBLE-DRAGON-WHITE.svg"></a>
      <?php if($page->template() == 'about'): ?>
        <a href="<?= $site->url() ?>" class="nav">Close</a>
      <?php else: ?>
      <a href="<?= $site->url() ?>/about" class="nav">About</a>
      <?php endif ?>
    </header>