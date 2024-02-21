<?php snippet('header') ?>
	<div id="container-right" class="container skew right js-loop fade">
		<?php $contents = $page->contents2()->toStructure();
		
		$arr = array(
		    'one',
		    'two',
		    'three',
		    'four',
		    'five'
		);

		$i = 0;

		foreach ($contents as $content): 

		$media = $content->media()->toFile();
		$year = $content->content()->content()->toPage()->year();
		$title = $content->content()->content()->toPage()->title();
		$client = $content->content()->content()->toPage()->client(); 

		$class = $arr[$i];

		if ($media->type() === 'image'):

			if($media->isPortrait() == true){
				$orientation = 'portrait';
			};
			if($media->isLandscape() == true){
				$orientation = 'landscape';
			};
			if($media->isSquare() == true){
				$orientation = 'square';
			};

		endif;
		if ($media->type() === 'video'):
			if($content->video_orientation() == 'portrait'){
				$orientation = 'portrait';
			};
			if($content->video_orientation() == 'landscape'){
				$orientation = 'landscape';
			};
			if($content->video_orientation() == 'square'){
				$orientation = 'square';
			};
		endif;

		if($i == 4){
			$arr = array_reverse($arr);
			$i = 1;
		} else {
			$i++;
		}
		?>
		<div class="content <?= $class ?> <?= $orientation ?>">
			<?php if ($media->type() === 'image'): ?>
			    <img class="media" src="<?= $media->url() ?>" alt="">
			  <?php elseif ($media->type() === 'video'): ?>
			    <video class="media" source src="<?= $media->url() ?>" type="<?= $media->mime() ?>" autoplay muted playsinline loop>
			    </video>
			<?php endif ?>
			<div class="info">
				<p><?= $year ?> <?= $title ?></p>
				<p><?= $client ?></p>
			</div>
		</div>
		<?php endforeach ?>
		
		<div id="black-filter-right" class="black-filter"></div>
	</div>
	<div id="container-left" class="container skew left js-loop fade">
		<?php $contents = $page->contents()->toStructure();
		
		$arr = array(
		    'one',
		    'two',
		    'three',
		    'four',
		    'five'
		);

		$i = 0;

		foreach ($contents as $content): 

		$media = $content->media()->toFile();
		$year = $content->content()->content()->toPage()->year();
		$title = $content->content()->content()->toPage()->title();
		$client = $content->content()->content()->toPage()->client(); 

		$class = $arr[$i];

		if ($media->type() === 'image'):

			if($media->isPortrait() == true){
				$orientation = 'portrait';
			};
			if($media->isLandscape() == true){
				$orientation = 'landscape';
			};
			if($media->isSquare() == true){
				$orientation = 'square';
			};

		endif;
		if ($media->type() === 'video'):
			if($content->video_orientation() == 'portrait'){
				$orientation = 'portrait';
			};
			if($content->video_orientation() == 'landscape'){
				$orientation = 'landscape';
			};
			if($content->video_orientation() == 'square'){
				$orientation = 'square';
			};
		endif;

		if($i == 4){
			$arr = array_reverse($arr);
			$i = 1;
		} else {
			$i++;
		}
		?>
		<div class="content <?= $class ?> <?= $orientation ?>">
			<?php if ($media->type() === 'image'): ?>
			    <img class="media" src="<?= $media->url() ?>" alt="">
			  <?php elseif ($media->type() === 'video'): ?>
			    <video class="media" source src="<?= $media->url() ?>" type="<?= $media->mime() ?>" autoplay muted playsinline loop>
			    </video>
			<?php endif ?>
			<div class="info">
				<p><?= $year ?> <?= $title ?></p>
				<p><?= $client ?></p>
			</div>
		</div>
		<?php endforeach ?>
		
		<div id="black-filter-left" class="black-filter"></div>
	</div>
<?php snippet('footer') ?>