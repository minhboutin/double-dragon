<?php snippet('header') ?>
	<div id="about" class="wrapper">
		<span id="about-text"><?= $page->text() ?></span>
		<div class="manifesto">
			<?= $page->manifesto()->kt() ?>
		</div>
		<div class="links">
			<ul class="find-us">
				<li class="title">
					Find us
				</li>
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
			<ul class="contact">
				<li class="title">
					Contact us
				</li>
				<li class="whatsapp">
					<a href="<?= $page->whatsapp() ?>" target="_blank" alt="Contact by Whatsapp">
						Whatsapp
					</a>
				</li>
				<li class="mail">
					<a href="mailto:<?= $page->mail() ?>" target="_blank" alt="Contact by mail">
						<?= $page->mail() ?>
					</a>
				</li>
			</ul>
			<ul class="social">
				<li class="title">
					Follow us
				</li>
				<?php $socials = $page->social()->toStructure();
				foreach ($socials as $social):
				?>
				<li>
					<a href="<?= $social->link() ?>" alt="<?= $social->network() ?>" target="_blank">
						<?= $social->network() ?>
					</a>
				</li>
				<?php endforeach ?>
			</ul>
		</div>
		<div class="credits">
			<ul>
				<li>
					<b>Website by</b>
				</li>
				<li>
					Kim Lê Boutin
				</li>
			</ul>
		</div>
	</div>
<?php snippet('footer') ?>