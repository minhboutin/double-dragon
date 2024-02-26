<?php snippet('header') ?>
	<div id="index-of-projects" class="wrapper">
		<ul class="small">
			<?php $contents = $site->find('index')->children()->sortBy('year', 'asc');
			foreach($contents as $content):
				if($content->logo()->isEmpty() != true):?>
				<li class="logo">
					<img src="<?= $content->logo()->toFile()->url() ?>" alt="<?= $content->title() ?> Logo">
				</li>
				<?php endif ?>
				<li class="year">
					<?= $content->year() ?>
				</li>
				<li id="<?= $content->id() ?>" class="project">
					<p class="title">
						<?= $content->title() ?>
					</p>
					<p class="description">
						<?= $content->client() ?>
						<br>
						<?= $content->event() ?>
					</p>
					<p class="tags">
						<?= $content->tags() ?>
					</p>
					<?php if($content->link()->isEmpty() == false): ?>
					<a href="<?= $content->link() ?>" alt="Learn more about <?= $content ?>" target="_blank" class="learn-more">
						Learn more
					</a>
					<?php endif ?>
				</li>
			<?php endforeach ?>
		</ul>
	</div>
<?php snippet('footer') ?>