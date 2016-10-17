/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// 设置宽高

	config.width = 680;

	config.height = 540;
	
	config.setWidthAndHeight=false;

	// 背景颜色

	//	config.uiColor = '#AADC6E';

	// 工具栏（基础'Basic'、全能'Full'、自定义）plugins/toolbar/plugin.js

	//	config.toolbar = 'Basic';

	config.toolbar = 'Full';

	//这将配合：
	config.toolbar_Full = [
			[ 'Source', 'Preview', 'Templates' ],
			//[ 'Paste', 'PasteText', 'PasteFromWord', 'Scayt' ],
			//[ 'Undo', 'Redo', 'Find', 'SelectAll', 'RemoveFormat' ],
			//[ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select','Button','HiddenField' ],
			[ 'Bold', 'Italic', 'Underline', 'Strike' ],
			//[ 'NumberedList', 'BulletedList', 'Outdent', 'Indent' ],
			[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ],
			'/',
			//[ 'Link', 'Unlink', 'Anchor' ],
			[ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar',
					'PageBreak' ], [ 'Styles', 'Format', 'Font', 'FontSize' ],
			[ 'TextColor', 'BGColor' ] ];
};
