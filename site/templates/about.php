<?php snippet('header') ?>
	<div id="about" class="wrapper">
		<span id="about-text"><?= $page->text() ?></span>
		<div class="external-links">
			<ul>
				<?php $links = $page->about()->toStructure();
				foreach ($links as $link):
				?>
				<li>
					<a href="<?= $link->link() ?>" alt="<?= $link->text() ?>" target="_blank">
						<?= $link->text() ?>
					</a>
				</li>
				<?php endforeach ?>
			</ul>
		</div>
		<div class="social">
			<ul>
				<?php $socials = $page->social()->toStructure();
				foreach ($socials as $social):
				?>
				<li>
					<a href="<?= $social->link() ?>" alt="<?= $social->network() ?>" target="_blank">
						<img src="<?= $social->picto()->toFile()->url() ?>">
					</a>
				</li>
				<?php endforeach ?>
			</ul>
		</div>
	</div>
<?php snippet('footer') ?>