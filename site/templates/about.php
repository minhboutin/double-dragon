<?php snippet('header') ?>
	<div id="about" class="wrapper">
		<div class="about">
			<?= $page->about()->kt() ?>
		</div>

		<div class="social">
			<ul>
				<?php $socials = $page->social()->toStructure();
				foreach ($socials as $social):
				?>
				<li>
					<a href="<?= $social->link() ?>" target="_blank">
						<?= $social->network() ?>
					</a>
				</li>
				<?php endforeach ?>
			</ul>
		</div>
	    <div id="textFlag" class="effect"></div>
	    </div>
	</div>
<?php snippet('footer') ?>