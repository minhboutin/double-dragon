		</main>
		<?php if($page->template() == 'about'): ?>
			<script src="https://unpkg.com/cursor-effects@latest/dist/browser.js"></script>
		<?php endif ?>
		<?= js([
			'assets/js/main.js',
		    '@auto',
		]) ?>
	</body>
</html>