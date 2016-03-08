<form action="" method="POST">
<div id="poststuff">
<?php do_meta_boxes( 'wpmmp_settings_page', 'normal', $settings ); ?>
</div>
<div id="wpmmp-buttons">
	<table>
		<tr>
			<td>
				<?php submit_button( __( 'Save Settings', 'wpmp' ), 'primary large', 'submit', false ) ?>
			</td>
			<td>
				<?php submit_button( __( 'Reset Settings', 'wpmp' ), 'secondary large', 'reset', false ) ?>
			</td>
		</tr>
	</table>
</div>
<input type="hidden" name="nonce" value="<?php echo $nonce ?>" />
</form>