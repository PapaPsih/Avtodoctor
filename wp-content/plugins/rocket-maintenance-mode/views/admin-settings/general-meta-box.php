<table class="wpmmp_input widefat" id="wpmmp_options">

	<tbody>
		
		<?php do_action( 'wpmmp_general_meta_box_start', $settings ); ?>

		<tr id="status">
			
			<td class="label">
				<label>
					<?php _e( 'Status', 'wpmp' ); ?>
				</label>
				<p class="description"><?php _e( 'Admin users will not get maintenance mode page. Please logout or use your browser private tab for testing.', 'wpmp' ); ?></p>
			</td>
			<td>
				<p><label><input type="radio" value="disabled" name="settings[status]" <?php checked( $settings['status'], 'disabled' ) ?> /><span><?php _e( 'Disabled', 'wpmmp' ) ?></span><label></p>
				<p><label><input type="radio" value="enabled" name="settings[status]" <?php checked( $settings['status'], 'enabled' ) ?> /><span><?php _e( 'Enabled', 'wpmmp' ) ?></span><label></p>
			</td>
			
		</tr>

		<tr id="theme">
			
			<td class="label">
				<label>
					<?php _e( 'Theme', 'wpmmp' ); ?>
				</label>
				<p class="description"></p>
			</td>
			<td>
				<ul id="wpmmp-themes">

					<li>
							<img src="<?php echo wpmmp_image_url( 'default-4.jpg' ) ?>" />
							<p><input <?php checked( 'default-4', $settings['theme'] ) ?> type="radio" name="settings[theme]" value="default-4" /><strong>Free Theme</strong></p>
					</li>

					<li>
							<a href="http://rocketplugins.com/wordpress-maintenance-mode-plugin/" target="_blank"> <img style="height: 208px" src="<?php echo wpmmp_image_url( 'alissa-1.png' ) ?>" />
							<p><input disabled <?php checked( 'alissa', $settings['theme'] ) ?> type="radio" name="settings[theme]" value="alissa" /> <strong>Paid Theme</strong></p></a>
					</li>

					<li>
							<a href="http://rocketplugins.com/wordpress-maintenance-mode-plugin/" target="_blank"> <img style="height: 208px" src="<?php echo wpmmp_image_url( 'minimal-temp.png' ) ?>" />
							<p><input disabled <?php checked( 'alissa', $settings['theme'] ) ?> type="radio" name="settings[theme]" value="Minimal" /> <strong>Paid Theme</strong></p></a>
					</li>

					<li>
							<a href="http://rocketplugins.com/wordpress-maintenance-mode-plugin/" target="_blank"> <img style="height: 208px" src="<?php echo wpmmp_image_url( 'simple-temp.png' ) ?>" />
							<p><input disabled <?php checked( 'alissa', $settings['theme'] ) ?> type="radio" name="settings[theme]" value="Stunning Coming Soon" /> <strong>Paid Theme</strong></p></a>
					</li>

					
					
					
					
					<?php foreach ( $themes as $theme ): ?>
					<?php endforeach; ?>
				</ul>
			</td>
			
		</tr>

		<tr id="page-title">
			
			<td class="label">
				<label>
					<?php _e( 'Page Title', 'wpmmp' ); ?>
				</label>
				<p class="description">Maintenance page title</p>
			</td>
			<td>
				<input type="text" name="settings[title]" value="<?php echo $settings['title'] ?>" />
			</td>
			
		</tr>

		<tr id="heading1">
			
			<td class="label">
				<label>
					<?php _e( 'Heading', 'wpmmp' ); ?>
				</label>
				<p class="description"></p>
			</td>
			<td>
				<input type="text" name="settings[heading1]" value="<?php echo $settings['heading1'] ?>" />
			</td>
			
		</tr>

		<tr id="heading2">
			
			<td class="label">
				<label>
					<?php _e( 'Sub heading', 'wpmmp' ); ?>
				</label>
				<p class="description"></p>
			</td>
			<td>
				<input type="text" name="settings[heading2]" value="<?php echo $settings['heading2'] ?>" />
			</td>
			
		</tr>

		<tr id="g-content">
			
			<td class="label">
				<label>
					<?php _e( 'Message', 'wpmmp' ); ?>
				</label>
				<p class="description"></p>
			</td>
			<td>
				<?php wp_editor( $settings['content'], 'gcontent-settings', array( 'textarea_name' => 'settings[content]', 'textarea_rows' => 7, 'teeny' => true, 'media_buttons' => false, 'quicktags' => false ) ) ?>
			</td> 
			
		</tr>

		<tr id="countdown_timer">
			
			<td class="label">
				<label>
					<?php _e( 'Countdown timer', 'wpmmp' ) ?>
				</label>
				<?php if ( ! defined( 'WPMMP_PRO_VERSION_ENABLED' ) ): ?>
				<a target="_blank" href="http://rocketplugins.com/wordpress-maintenance-mode-plugin/"><p style="color: red" class="description"><?php _e( 'Purchase the premium version to get access to this premium feature.', 'wpmmp') ?></p></a>
				<?php endif; ?>
			</td>

			<td>
				<input type="checkbox" name="settings[countdown_timer]" <?php checked( $settings['countdown_timer'], true ) ?> />
				<p><label><?php _e( 'Set date and time', 'wpmmp' ) ?><input type="datetime-local" name="settings[countdown_time]" value="<?php echo $settings['countdown_time'] ?>" /></label></p>
			</td>
		</tr>

		<tr id="progress_bar">
			
			<td class="label">
				<label>
					<?php _e( 'Progress bar', 'wpmmp' ) ?>
				</label>
			</td>

			<td>
				<input type="checkbox" name="settings[progress_bar]" <?php checked( $settings['progress_bar'], true ) ?> />
				<p>
					How much progress has been made? <input type="number" name="settings[progress_bar_range]" min="0" max="100" value="<?php echo $settings['progress_bar_range'] ?>" /> <strong>%</strong>
				</p>
			</td>
		</tr>


		

		<?php do_action( 'wpmmp_general_meta_box_end', $settings ); ?>

	</tbody>

</table>