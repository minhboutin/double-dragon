<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">

    <title><?= $site->title() ?></title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet">

    <?= css([
      'assets/css/main.css',
      '@auto'
    ]) ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  </head>
  <body>

  <main id="main">
    <header id="header">
      <a href="<?= $site->url() ?>/index" class="nav">Index</a>
      <a href="<?= $site->url() ?>"><img class="logo" src="<?= $site->url() ?>/assets/logo/LOGO-DOUBLE-DRAGON-WHITE.svg"></a>
      <a href="<?= $site->url() ?>/about" class="nav">About</a>
    </header>