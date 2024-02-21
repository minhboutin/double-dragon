<?php snippet('header') ?>
	<div id="index-of-projects" class="wrapper">
		<ul>
			<?php $contents = $site->find('index')->children();
			foreach($contents as $content):?>
				<li id="<?= $content->id() ?>">
					<div class="main">
						<p class="year"><?= $content->year() ?></p>
						<p class="title"><?= $content->title() ?></p>
					</div>
					<div class="small">
						<p class="description"><?= $content->event() ?></p>
						<p class="tags"><?= $content->tags() ?></p>
					</div>
				</li>
			<?php endforeach ?>
		</ul>
	</div>
<?php snippet('footer') ?>