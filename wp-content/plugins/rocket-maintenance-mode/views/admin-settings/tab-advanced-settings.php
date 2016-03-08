<form action="" method="POST">
<div id="poststuff">

<table class="wpmmp_input widefat" id="wpmmp_options">

	<tbody>

		<tr id="503-status">
			
			<td class="label">
				<label>
					<?php _e( 'HTTP 503 header', 'wpmp' ); ?>
				</label>
				<p class="description"></p>
			</td>
			<td>
				<p><label><input type="radio" value="disabled" name="settings[http_503_header]" <?php checked( $settings['http_503_header'], 'disabled' ) ?> /><span><?php _e( 'Disabled', 'wpmmp' ) ?></span><label></p>
				<p><label><input type="radio" value="enabled" name="settings[http_503_header]" <?php checked( $settings['http_503_header'], 'enabled' ) ?> /><span><?php _e( 'Enabled', 'wpmmp' ) ?></span><label></p>
			</td>
			
		</tr>

		<tr id="disable-feed">
			
			<td class="label">
				<label>
					<?php _e( 'Feed access', 'wpmp' ); ?>
				</label>
				<p class="description"></p>
			</td>
			<td>
				<p><label><input type="radio" value="disabled" name="settings[feed]" <?php checked( $settings['feed'], 'disabled' ) ?> /><span><?php _e( 'Disabled', 'wpmmp' ) ?></span><label></p>
				<p><label><input type="radio" value="enabled" name="settings[feed]" <?php checked( $settings['feed'], 'enabled' ) ?> /><span><?php _e( 'Enabled', 'wpmmp' ) ?></span><label></p>
			</td>
			
		</tr>

		<?php do_action( 'wpmmp_advanced_settings' ) ?>

	</tbody>
</table>

</div>
<div id="wpmmp-buttons" style="margin-top: 25px;">
	<?php submit_button( __( 'Save Settings', 'wpmp' ), 'primary large', 'submit', false ) ?>
</div>
<input type="hidden" name="nonce" value="<?php echo $nonce ?>" />
</form>