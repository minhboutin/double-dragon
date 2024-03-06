<?php snippet('header') ?>
	<div id="index-of-projects" class="wrapper">
		<div class="list">
			<?php $contents = $site->find('index')->children()->sortBy('year', 'asc');
			foreach($contents as $content):?>
			<ul>
				<?php if($content->logo()->isEmpty() != true):?>
				<li class="logo">
					<img src="<?= $content->logo()->toFile()->url() ?>" alt="<?= $content->title() ?> Logo">
				</li>
				<?php endif ?>
				<li class="year">
					<p class="type">
						Year
					</p>
					<p class="data">
						<?= $content->year() ?>
					</p>
				</li>
				<li class="client">
					<p class="type">
						Client
					</p>
					<p class="data">
						<?= $content->client() ?>
					</p>
				</li>
				<li class="location">
					<p class="type">
						Location
					</p>
					<p class="data">
						<?= $content->location() ?>
					</p>
				</li>
				<li class="project">
					<p class="type">
						Project
					</p>
					<p class="data">
						<?= $content->event() ?>
					</p>
				</li>
				<li class="roles">
					<p class="type">
						Role(s)
					</p>
					<p class="data">
						<?= $content->tags() ?>
					</p>
				</li>
			</ul>
			<div class="learn-more">
				<?php if($content->link()->isEmpty() == false): ?>
				<a href="<?= $content->link() ?>" alt="Learn more about <?= $content ?>" target="_blank">
					Learn more
				</a>
				<?php endif ?>
			</div>
			<?php endforeach ?>
		</div>
	</div>
<?php snippet('footer') ?>