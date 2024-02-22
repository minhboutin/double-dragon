<?php snippet('header') ?>
	<div id="index-of-projects" class="wrapper">
		<ul>
			<?php $contents = $site->find('index')->children()->sortBy('year', 'asc');
			foreach($contents as $content):?>
				<?php if($content->isFirst() == false):
					  $prevYear = $content->prev()->year(); ?>
					<?php if($prevYear->toString() != $content->year()->toString()): ?>
				<li class="year">
					<?= $content->year() ?>
				</li>
					<?php endif ?>
				
				<?php endif ?>
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