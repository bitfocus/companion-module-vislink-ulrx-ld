var instance_skel = require('../../instance_skel');
var debug;
var log;

function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function renameTimestamp() {
	let d          = new Date();
	let curr_date  = addZero(d.getDate());
	let curr_month = addZero(d.getMonth()+1);
	let curr_year  = addZero(d.getFullYear());
	let h          = addZero(d.getHours());
	let m          = addZero(d.getMinutes());
	let stamp      = curr_year + "" + curr_month + "" + curr_date + "_" + h + m;
	return stamp;
};

function instance(system, id, config) {
	let self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	return self;
}

instance.prototype.init = function() {
	let self = this;

	self.status(self.STATE_OK);

	self.init_actions();
	self.init_presets();

	debug = self.debug;
	log   = self.log;
};

instance.prototype.updateConfig = function(config) {
	let self = this;

	self.status(self.STATE_OK);

	self.config = config;

	self.init_actions();
	self.init_presets();
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	let self = this;
	return [
		{
			type:  'text',
			id:    'info',
			width: 12,
			label: 'Information',
			value: 'This module controls an Vislink ULRX-LD receiver/demodulator.'
		},
		{
			type:  'textinput',
			id:    'host',
			label: 'Target IP',
			width: 8,
			regex: self.REGEX_IP
		},
		{
			type:  'text',
			id:    'infoLic',
			width: 12,
			label: 'Licenced Features',
			value: 'Licences on Demodulator and Decoder (only for filtering the settings).'
		},
		//ToDo: set the licences dynamically after fetching the licensing information out of the receiver
		{
			type:  'checkbox',
			id:    'FourInputDemod',
			label: '4 Input Demod',
			width: 8
		},
		{
			type:  'checkbox',
			id:    'Diversity',
			label: 'Diversity',
			width: 8
		},
		{
			type:  'checkbox',
			id:    'Deinterleaving',
			label: 'De-interleaving',
			width: 8
		},
		{
			type:  'checkbox',
			id:    'FourInputDualPedestal',
			label: '4 Input Dual Pedestal',
			width: 8
		},
		{
			type:  'checkbox',
			id:    'Descrambling',
			label: 'De-scrambling',
			width: 8
		},
		{
			type:  'checkbox',
			id:    'uhd',
			label: '4K and UHD',
			width: 8
		},
		{
			type:  'checkbox',
			id:    'DualDecode',
			label: 'Dual decode',
			width: 8
		},
		{
			type:  'checkbox',
			id:    'H264',
			label: 'H.264',
			width: 8
		},
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	let self = this;
	debug("destroy");
};

instance.prototype.init_presets = function () {
	let self = this;
	let presets = [];




	

	self.setPresetDefinitions(presets);
}

instance.prototype.init_actions = function(system) {
	let self = this;

	let actionsArr = {};


if(this.config.Diversity){
	actionsArr.ASI1OutputMux = {
		label: 'Decoder Source',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Source',
				id:      'ASI1OutputMuxSource',
				width:   12,
				default: 'DB_P17101_ASI1_OUTPUT_MUX&value=Demodulator',
				choices:	[
					{ id: 'DB_P17101_ASI1_OUTPUT_MUX&value=Demodulator',		label: 'Demodulator' },
					{ id: 'DB_P17101_ASI1_OUTPUT_MUX&value=Ext ASI',		label: 'Ext ASI' },
					{ id: 'DB_P17101_ASI1_OUTPUT_MUX&value=Diversity',		label: 'Diversity' },
					{ id: 'DB_P17101_ASI1_OUTPUT_MUX&value=Off',		label: 'Off' },
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.ASI1OutputMuxSource;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
	
	actionsArr.ASI2OutputMux = {
		label: 'ASI Out Source',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Source',
				id:      'ASI2OutputMuxSource',
				width:   12,
				default: 'DB_P17101_ASI2_OUTPUT_MUX&value=Demodulator',
				choices:	[
					{ id: 'DB_P17101_ASI2_OUTPUT_MUX&value=Demodulator',		label: 'Demodulator' },
					{ id: 'DB_P17101_ASI2_OUTPUT_MUX&value=Ext ASI',		label: 'Ext ASI' },
					{ id: 'DB_P17101_ASI2_OUTPUT_MUX&value=Diversity',		label: 'Diversity' },
					{ id: 'DB_P17101_ASI2_OUTPUT_MUX&value=Off',		label: 'Off' },
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.ASI2OutputMuxSource;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
}else{
	actionsArr.ASI1OutputMux = {
		label: 'Decoder Source',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Source',
				id:      'ASI1OutputMuxSource',
				width:   12,
				default: 'DB_P17101_ASI1_OUTPUT_MUX&value=Demodulator',
				choices:	[
					{ id: 'DB_P17101_ASI1_OUTPUT_MUX&value=Demodulator',		label: 'Demodulator' },
					{ id: 'DB_P17101_ASI1_OUTPUT_MUX&value=Ext ASI',		label: 'Ext ASI' },
					{ id: 'DB_P17101_ASI1_OUTPUT_MUX&value=Off',		label: 'Off' },
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.ASI1OutputMuxSource;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
	
	actionsArr.ASI2OutputMux = {
		label: 'ASI Out Source',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Source',
				id:      'ASI2OutputMuxSource',
				width:   12,
				default: 'DB_P17101_ASI2_OUTPUT_MUX&value=Demodulator',
				choices:	[
					{ id: 'DB_P17101_ASI2_OUTPUT_MUX&value=Demodulator',		label: 'Demodulator' },
					{ id: 'DB_P17101_ASI2_OUTPUT_MUX&value=Ext ASI',		label: 'Ext ASI' },
					{ id: 'DB_P17101_ASI2_OUTPUT_MUX&value=Off',		label: 'Off' },
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.ASI2OutputMuxSource;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
}

	

	

	actionsArr.ULRXFrequency = {

		
		label: 'Demod Frequency',
		options: [
			{
					type:    'textinput',
					label:   'Frequency (GHz, example: 2.45)',
					id:      'frequency'
			}
		],
	
		callback: function(action, bank) {
			let cmd = 'DB_ULRX_FREQ&value=' + action.options.frequency;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
		  
	};

	actionsArr.ULRXRxMode = {
		label: 'Demod Type',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Modulation Type',
				id:      'ULRXRxMode',
				width:   12,
				default: 'DB_ULRX_RX_MODE&value=LMS-T',
				choices:	[
					{ id: 'DB_ULRX_RX_MODE&value=LMS-T',		label: 'LMS-T' },
					{ id: 'DB_ULRX_RX_MODE&value=DVB-T',		label: 'DVB-T' },
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.ULRXRxMode;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};


	if(this.config.FourInputDualPedestal){
	actionsArr.ULRXChanBW = {
		label: 'Demod Bandwidth',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Demodulator bandwidth',
				id:      'ULRXChanBw',
				width:   12,
				default: 'DB_ULRX_CHAN_BW&value=10MHz',
				choices:	[
					{ id: 'DB_ULRX_CHAN_BW&value=3MHz',		label: '3MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=4MHz',		label: '4MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=5MHz',		label: '5MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=6MHz',		label: '6MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=7MHz',		label: '7MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=8MHz',		label: '8MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=10MHz',		label: '10MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=12MHz',		label: '12MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=4MHz (Dual)',		label: '4MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=6MHz (Dual)',		label: '6MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=8MHz (Dual)',		label: '8MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=10MHz (Dual)',		label: '10MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=12MHz (Dual)',		label: '12MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=14MHz (Dual)',		label: '14MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=16MHz (Dual)',		label: '16MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=20MHz (Dual)',		label: '20MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=24MHz (Dual)',		label: '24MHz (Dual)' },
					{ id: 'DB_ULRX_CHAN_BW&value=Auto',		label: 'Auto' },
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.ULRXChanBw;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
}else{
	actionsArr.ULRXChanBW = {
		label: 'Demod Bandwidth',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Demodulator bandwidth',
				id:      'ULRXChanBw',
				width:   12,
				default: 'DB_ULRX_CHAN_BW&value=10MHz',
				choices:	[
					{ id: 'DB_ULRX_CHAN_BW&value=3MHz',		label: '3MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=4MHz',		label: '4MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=5MHz',		label: '5MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=6MHz',		label: '6MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=7MHz',		label: '7MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=8MHz',		label: '8MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=10MHz',		label: '10MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=12MHz',		label: '12MHz' },
					{ id: 'DB_ULRX_CHAN_BW&value=Auto',		label: 'Auto' },
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.ULRXChanBw;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
}

	actionsArr.ULRXGuardInt = {
		label: 'Guard Interval',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Guard Interval',
				id:      'P17101GuardInt',
				width:   12,
				default: 'DB_P17101_GUARD_INT&value=1/16',
				choices:	[
					{ id: 'DB_P17101_GUARD_INT&value=1/32',		label: '1/32' },
					{ id: 'DB_P17101_GUARD_INT&value=1/16',		label: '1/16' },
					{ id: 'DB_P17101_GUARD_INT&value=1/8',		label: '1/8' },
					{ id: 'DB_P17101_GUARD_INT&value=1/4',		label: '1/4' },
					{ id: 'DB_P17101_GUARD_INT&value=Auto',		label: 'Auto' },
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.P17101GuardInt;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};

	actionsArr.ULRXPolarity = {
		label: 'Polarity',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Polarity',
				id:      'P17101SpecPol',
				width:   12,
				default: 'DB_P17101_SPEC_POL&value=Normal',
				choices:	[
					{ id: 'DB_P17101_SPEC_POL&value=Normal',		label: 'Normal' },
					{ id: 'DB_P17101_SPEC_POL&value=Inverted',		label: 'Inverted' },
					{ id: 'DB_P17101_SPEC_POL&value=Auto',		label: 'Auto' },
					
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.P17101SpecPol;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};

	actionsArr.ULRXDownConverter = {
		label: 'DownConverter',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Downconverter',
				id:      'ULRXDownConverter',
				width:   12,
				default: 'DB_ULRX_DOWN_CONVERTER&value=L3025-1927E',
				choices:	[
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3010Lo',		label: 'L3010Lo' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3010Hi',		label: 'L3010Hi' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3014',		label: 'L3014' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3030',		label: 'L3030' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3033',		label: 'L3033' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3034',		label: 'L3034' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3037',		label: 'L3037' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3039',		label: 'L3039' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3060',		label: 'L3060' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3066',		label: 'L3066' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3080',		label: 'L3080' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3085',		label: 'L3085' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3090',		label: 'L3090' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L9234',		label: 'L9234' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-1415',		label: 'L3025-1415' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-1718',		label: 'L3025-1718' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-1927',		label: 'L3025-1927' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-1927E',		label: 'L3025-1927E' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-2024',		label: 'L3025-2024' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-2529',		label: 'L3025-2529' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-2732',		label: 'L3025-2732' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-3236',		label: 'L3025-3236' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-3239E',		label: 'L3025-3239E' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-4450',		label: 'L3025-4450' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-5459',		label: 'L3025-5459' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-6471',		label: 'L3025-6471' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-6875',		label: 'L3025-6875' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-7277',		label: 'L3025-7277' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=L3025-6368',		label: 'L3025-6368' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=Other',		label: 'Other' },
					{ id: 'DB_ULRX_DOWN_CONVERTER&value=None',		label: 'None' },	
					
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.ULRXDownConverter;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};

	actionsArr.ULRXOtherLO = {

		
		label: 'Other LO Frequency',
		options: [
			{
					type:    'textinput',
					label:   'LO Frequency (0.0068-10.00GHz, example: 2.45)',
					id:      'lofrequency'
			}, 
			{
				type:    'dropdown',
				label:   'Choose LO Polarity',
				id:      'P17101_LO_MIX',
				width:   12,
				default: 'DB_P17101_LO_MIX&value=Low side',
				choices:	[
					{ id: 'DB_P17101_LO_MIX&value=Low side',		label: 'Low side' },
					{ id: 'DB_P17101_LO_MIX&value=High side',		label: 'High side' },
				
					
					
				]
			}
		],
	
		callback: function(action, bank) {
			let cmd1 = 'DB_ULRX_OTHER_LO&value=' + action.options.lofrequency;
			self.log('debug', 'CMD Send: ' + cmd1);
			self.sendCommand(cmd1);
			let cmd2 = action.options.P17101_LO_MIX;
			self.log('debug', 'CMD Send: ' + cmd2);
			self.sendCommand(cmd2);
		}
		  
	};

	actionsArr.ULRXOtherLO = {

		
		label: 'LNB Power',
		options: [
			{
				type: 'checkbox',
				label: 'LNB1 Power',
				id: 'lnb1power',
				default: true
			}, 
			
			{
				type: 'checkbox',
				label: 'LNB2 Power',
				id: 'lnb2power',
				default: true
			}, 
			{
				type: 'checkbox',
				label: 'LNB3 Power',
				id: 'lnb3power',
				default: true
			}, 
			{
				type: 'checkbox',
				label: 'LNB4 Power',
				id: 'lnb4power',
				default: true
			}, 
			
		],
	
		callback: function(action, bank) {

			if(action.options.lnb1power){
				let cmd = 'DB_P17101_LNB_PWR1&value=On';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}else{
				let cmd = 'DB_P17101_LNB_PWR1&value=Off';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}

			if(action.options.lnb2power){
				let cmd = 'DB_P17101_LNB_PWR2&value=On';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}else{
				let cmd = 'DB_P17101_LNB_PWR2&value=Off';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}

			if(action.options.lnb3power){
				let cmd = 'DB_P17101_LNB_PWR3&value=On';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}else{
				let cmd = 'DB_P17101_LNB_PWR3&value=Off';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}

			if(action.options.lnb4power){
				let cmd = 'DB_P17101_LNB_PWR4&value=On';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}else{
				let cmd = 'DB_P17101_LNB_PWR4&value=Off';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}
			
			
		}
		  
	};

	actionsArr.DB_ULRX0_VIDEO_FORMAT_MODE = {
		label: 'Decoder1 video format mode',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Decoder1 video format mode',
				id:      'DB_ULRX0_VIDEO_FORMAT_MODE',
				width:   12,
				default: 'DB_ULRX0_VIDEO_FORMAT_MODE&value=Auto',
				choices:	[
					{ id: 'DB_ULRX0_VIDEO_FORMAT_MODE&value=Auto',		label: 'Auto' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT_MODE&value=Manual',		label: 'Manual' },
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.DB_ULRX0_VIDEO_FORMAT_MODE;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};

	if(this.config.uhd){

	actionsArr.DB_ULRX0_VIDEO_FORMAT = {
		label: 'Decoder1 video format',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Decoder1 video format',
				id:      'DB_ULRX0_VIDEO_FORMAT',
				width:   12,
				default: 'DB_ULRX0_VIDEO_FORMAT&value=1080i50',
				choices:	[
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=480i59',		label: '480i59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=576i50',		label: '576i50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=720p50',		label: '720p50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=720p59',		label: '720p59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=720p60',		label: '720p60' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080i50',		label: '1080i50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080i59',		label: '1080i59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080i60',		label: '1080i60' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p23',		label: '1080p23' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p24',		label: '1080p24' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p25',		label: '1080p25' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p29',		label: '1080p29' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p30',		label: '1080p30' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF23',		label: '1080PsF23' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF24',		label: '1080PsF24' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF25',		label: '1080PsF25' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF29',		label: '1080PsF29' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF30',		label: '1080PsF30' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p50',		label: '1080p50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p59',		label: '1080p59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p60',		label: '1080p60' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=UHDp23',		label: 'UHDp23' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=UHDp24',		label: 'UHDp24' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=UHDp25',		label: 'UHDp25' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=UHDp29',		label: 'UHDp29' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=UHDp30',		label: 'UHDp30' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=UHDp50',		label: 'UHDp50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=UHDp59',		label: 'UHDp59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=UHDp60',		label: 'UHDp60' },
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.DB_ULRX0_VIDEO_FORMAT;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
}else{
	actionsArr.DB_ULRX0_VIDEO_FORMAT = {
		label: 'Decoder1 video format',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Decoder1 video format',
				id:      'DB_ULRX0_VIDEO_FORMAT',
				width:   12,
				default: 'DB_ULRX0_VIDEO_FORMAT&value=1080i50',
				choices:	[
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=480i59',		label: '480i59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=576i50',		label: '576i50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=720p50',		label: '720p50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=720p59',		label: '720p59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=720p60',		label: '720p60' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080i50',		label: '1080i50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080i59',		label: '1080i59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080i60',		label: '1080i60' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p23',		label: '1080p23' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p24',		label: '1080p24' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p25',		label: '1080p25' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p29',		label: '1080p29' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p30',		label: '1080p30' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF23',		label: '1080PsF23' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF24',		label: '1080PsF24' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF25',		label: '1080PsF25' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF29',		label: '1080PsF29' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080PsF30',		label: '1080PsF30' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p50',		label: '1080p50' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p59',		label: '1080p59' },
					{ id: 'DB_ULRX0_VIDEO_FORMAT&value=1080p60',		label: '1080p60' },
					
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.DB_ULRX0_VIDEO_FORMAT;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
}

actionsArr.DB_ULRX0_VIDEO_DELAY_MODE = {
	label: 'Decoder1 video delay mode',
	options: [
		{
			type:    'dropdown',
			label:   'Choose Decoder1 video delay mode',
			id:      'DB_ULRX0_VIDEO_DELAY_MODE',
			width:   12,
			default: 'DB_ULRX0_VIDEO_DELAY_MODE&value=Low',
			choices:	[
				{ id: 'DB_ULRX0_VIDEO_DELAY_MODE&value=Standard',		label: 'Standard' },
				{ id: 'DB_ULRX0_VIDEO_DELAY_MODE&value=Low',		label: 'Low' },
			]
		},
	],
	callback: function(action, bank) {
		let cmd = action.options.DB_ULRX0_VIDEO_DELAY_MODE;
		self.log('debug', 'CMD Send: ' + cmd);
		self.sendCommand(cmd);
	}
};


actionsArr.DB_ULRX0_VIDEO_PTS_OFFSET = {

		
	label: 'Decoder1 Video PTS offset',
	options: [
		{
				type:    'number',
				label:   'Offset (-450000 - 200)',
				id:      'videoptsoffset',
				min: -450000,
				max: 200,
				step: 1,
				default: 0,
				required: true,
				range: false,
		}
	],

	callback: function(action, bank) {
		let cmd = 'DB_ULRX0_VIDEO_PTS_OFFSET&value=' + action.options.videoptsoffset;
		self.log('debug', 'CMD Send: ' + cmd);
		self.sendCommand(cmd);
	}
	  
};

actionsArr.DB_ULRX0_AUDIO_PTS_OFFSET = {

		
	label: 'Decoder1 Audio PTS offset',
	options: [
		{
				type:    'number',
				label:   'Offset (-450000 - 200)',
				id:      'audioptsoffset',
				min: -450000,
				max: 200,
				step: 1,
				default: 0,
				required: true,
				range: false,
		}
	],

	callback: function(action, bank) {
		let cmd = 'DB_ULRX0_AUDIO_PTS_OFFSET&value=' + action.options.audioptsoffset;
		self.log('debug', 'CMD Send: ' + cmd);
		self.sendCommand(cmd);
	}
	  
};


actionsArr.DB_ULRX0_MONITOR_OUTPUT = {
	label: 'Decoder1 Monitor Output',
	options: [
		{
			type:    'dropdown',
			label:   'Choose Decoder1 monitori output',
			id:      'DB_ULRX0_MONITOR_OUTPUT',
			width:   12,
			default: 'DB_ULRX0_MONITOR_OUTPUT&value=SDI (decoder 1)',
			choices:	[
				{ id: 'DB_ULRX0_MONITOR_OUTPUT&value=ASI',		label: 'ASI' },
				{ id: 'DB_ULRX0_MONITOR_OUTPUT&value=SDI (decoder 1)',		label: 'SDI (decoder 1)' },
				{ id: 'DB_ULRX0_MONITOR_OUTPUT&value=SDI (decoder 2)',		label: 'SDI (decoder 2)' },
				{ id: 'DB_ULRX0_MONITOR_OUTPUT&value=SDI-top left',		label: 'SDI-top left' },
				{ id: 'DB_ULRX0_MONITOR_OUTPUT&value=SDI-top right',		label: 'SDI-top right' },
				{ id: 'DB_ULRX0_MONITOR_OUTPUT&value=SDI-bottom left',		label: 'SDI-bottom left' },
				{ id: 'DB_ULRX0_MONITOR_OUTPUT&value=SDI-bottom right',		label: 'SDI-bottom right' },
				
			]
		},
	],
	callback: function(action, bank) {
		let cmd = action.options.DB_ULRX0_MONITOR_OUTPUT;
		self.log('debug', 'CMD Send: ' + cmd);
		self.sendCommand(cmd);
	}
};

actionsArr.DB_ULRX0_OSD_ENABLE = {

		
	label: 'Decoder 1 Monitor Out OSD Enable',
	options: [
		{
			type: 'checkbox',
			label: 'Enable OSD on Mon out Dec1',
			id: 'DB_ULRX0_OSD_ENABLE',
			default: true
		}, 
		
		
	],

	callback: function(action, bank) {

		if(action.options.DB_ULRX0_OSD_ENABLE){
			let cmd = 'DB_ULRX0_OSD_ENABLE&value=On';
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}else{
			let cmd = 'DB_ULRX0_OSD_ENABLE&value=Off';
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}		
	}
	  
};

actionsArr.DB_ULRX0_OSD_PID = {

		
	label: 'Decoder1 OSD PID',
	options: [
		{
				type:    'number',
				label:   'OSD PID (0 - 8190)',
				id:      'dec1osdpid',
				min: 0,
				max: 8190,
				step: 1,
				default: 8000,
				required: true,
				range: false,
		}
	],

	callback: function(action, bank) {
		let cmd = 'DB_ULRX0_OSD_PID&value=' + action.options.dec1osdpid;
		self.log('debug', 'CMD Send: ' + cmd);
		self.sendCommand(cmd);
	}
	  
};

actionsArr.DB_ULRX0_VIDEO_LOSS = {
	label: 'Decoder1 Video loss action',
	options: [
		{
			type:    'dropdown',
			label:   'Choose Decoder1 video loss action',
			id:      'DB_ULRX0_VIDEO_LOSS',
			width:   12,
			default: 'DB_ULRX0_VIDEO_LOSS&value=Freeze',
			choices:	[
				{ id: 'DB_ULRX0_VIDEO_LOSS&value=Blue',		label: 'Blue' },
				{ id: 'DB_ULRX0_VIDEO_LOSS&value=Freeze',		label: 'Freeze' },
				{ id: 'DB_ULRX0_VIDEO_LOSS&value=Black',		label: 'Black' },
				{ id: 'DB_ULRX0_VIDEO_LOSS&value=Bars',		label: 'Bars' },
				
				
			]
		},
	],
	callback: function(action, bank) {
		let cmd = action.options.DB_ULRX0_VIDEO_LOSS;
		self.log('debug', 'CMD Send: ' + cmd);
		self.sendCommand(cmd);
	}
};

actionsArr.DB_ULRX0_HDR_MODE = {
	label: 'Decoder1 HDR mode',
	options: [
		{
			type:    'dropdown',
			label:   'Choose Decoder1 HDR mode',
			id:      'DB_ULRX0_HDR_MODE',
			width:   12,
			default: 'DB_ULRX0_HDR_MODE&value=Off',
			choices:	[
				{ id: 'DB_ULRX0_HDR_MODE&value=Off',		label: 'Off' },
				{ id: 'DB_ULRX0_HDR_MODE&value=On',		label: 'On' },
				{ id: 'DB_ULRX0_HDR_MODE&value=Auto',		label: 'Auto' },				
				
			]
		},
	],
	callback: function(action, bank) {
		let cmd = action.options.DB_ULRX0_HDR_MODE;
		self.log('debug', 'CMD Send: ' + cmd);
		self.sendCommand(cmd);
	}
};
actionsArr.DB_ULRX0_BREAKUP_DURATION = {

		
	label: 'Decoder1 Breakup duration',
	options: [
		{
				type:    'number',
				label:   'Breakup duration in ms(0 - 10000)',
				id:      'dec1breakupduration',
				min: 0,
				max: 10000,
				step: 1,
				default: 3000,
				required: true,
				range: false,
		}
	],

	callback: function(action, bank) {
		let cmd = 'DB_ULRX0_BREAKUP_DURATION&value=' + action.options.dec1breakupduration;
		self.log('debug', 'CMD Send: ' + cmd);
		self.sendCommand(cmd);
	}
	  
};





/////////////////////////////////////////////////
//Second Decoder. Copied settings from Decoder0//
/////////////////////////////////////////////////
if(this.config.DualDecode){
	actionsArr.DB_ULRX1_VIDEO_FORMAT_MODE = {
		label: 'Decoder2 video format mode',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Decoder2 video format mode',
				id:      'DB_ULRX1_VIDEO_FORMAT_MODE',
				width:   12,
				default: 'DB_ULRX1_VIDEO_FORMAT_MODE&value=Auto',
				choices:	[
					{ id: 'DB_ULRX1_VIDEO_FORMAT_MODE&value=Auto',		label: 'Auto' },
					{ id: 'DB_ULRX1_VIDEO_FORMAT_MODE&value=Manual',		label: 'Manual' },
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.DB_ULRX1_VIDEO_FORMAT_MODE;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};
	if(this.config.uhd){

		actionsArr.DB_ULRX1_VIDEO_FORMAT = {
			label: 'Decoder2 video format',
			options: [
				{
					type:    'dropdown',
					label:   'Choose Decoder2 video format',
					id:      'DB_ULRX1_VIDEO_FORMAT',
					width:   12,
					default: 'DB_ULRX1_VIDEO_FORMAT&value=1080i50',
					choices:	[
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=480i59',		label: '480i59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=576i50',		label: '576i50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=720p50',		label: '720p50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=720p59',		label: '720p59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=720p60',		label: '720p60' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080i50',		label: '1080i50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080i59',		label: '1080i59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080i60',		label: '1080i60' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p23',		label: '1080p23' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p24',		label: '1080p24' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p25',		label: '1080p25' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p29',		label: '1080p29' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p30',		label: '1080p30' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF23',		label: '1080PsF23' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF24',		label: '1080PsF24' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF25',		label: '1080PsF25' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF29',		label: '1080PsF29' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF30',		label: '1080PsF30' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p50',		label: '1080p50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p59',		label: '1080p59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p60',		label: '1080p60' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=UHDp23',		label: 'UHDp23' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=UHDp24',		label: 'UHDp24' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=UHDp25',		label: 'UHDp25' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=UHDp29',		label: 'UHDp29' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=UHDp30',		label: 'UHDp30' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=UHDp50',		label: 'UHDp50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=UHDp59',		label: 'UHDp59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=UHDp60',		label: 'UHDp60' },
						
					]
				},
			],
			callback: function(action, bank) {
				let cmd = action.options.DB_ULRX1_VIDEO_FORMAT;
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}
		};
	}else{
		actionsArr.DB_ULRX1_VIDEO_FORMAT = {
			label: 'Decoder2 video format',
			options: [
				{
					type:    'dropdown',
					label:   'Choose Decoder2 video format',
					id:      'DB_ULRX1_VIDEO_FORMAT',
					width:   12,
					default: 'DB_ULRX1_VIDEO_FORMAT&value=1080i50',
					choices:	[
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=480i59',		label: '480i59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=576i50',		label: '576i50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=720p50',		label: '720p50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=720p59',		label: '720p59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=720p60',		label: '720p60' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080i50',		label: '1080i50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080i59',		label: '1080i59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080i60',		label: '1080i60' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p23',		label: '1080p23' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p24',		label: '1080p24' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p25',		label: '1080p25' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p29',		label: '1080p29' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p30',		label: '1080p30' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF23',		label: '1080PsF23' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF24',		label: '1080PsF24' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF25',		label: '1080PsF25' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF29',		label: '1080PsF29' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080PsF30',		label: '1080PsF30' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p50',		label: '1080p50' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p59',		label: '1080p59' },
						{ id: 'DB_ULRX1_VIDEO_FORMAT&value=1080p60',		label: '1080p60' },
						
						
					]
				},
			],
			callback: function(action, bank) {
				let cmd = action.options.DB_ULRX1_VIDEO_FORMAT;
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}
		};
	}
	actionsArr.DB_ULRX1_VIDEO_DELAY_MODE = {
		label: 'Decoder2 video delay mode',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Decoder2 video delay mode',
				id:      'DB_ULRX1_VIDEO_DELAY_MODE',
				width:   12,
				default: 'DB_ULRX1_VIDEO_DELAY_MODE&value=Low',
				choices:	[
					{ id: 'DB_ULRX1_VIDEO_DELAY_MODE&value=Standard',		label: 'Standard' },
					{ id: 'DB_ULRX1_VIDEO_DELAY_MODE&value=Low',		label: 'Low' },
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.DB_ULRX1_VIDEO_DELAY_MODE;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};

	actionsArr.DB_ULRX1_VIDEO_PTS_OFFSET = {

		
		label: 'Decoder2 Video PTS offset',
		options: [
			{
					type:    'number',
					label:   'Offset (-450000 - 200)',
					id:      'videoptsoffset',
					min: -450000,
					max: 200,
					step: 1,
					default: 0,
					required: true,
					range: false,
			}
		],
	
		callback: function(action, bank) {
			let cmd = 'DB_ULRX1_VIDEO_PTS_OFFSET&value=' + action.options.videoptsoffset;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
		  
	};

	actionsArr.DB_ULRX1_AUDIO_PTS_OFFSET = {

		
		label: 'Decoder2 Audio PTS offset',
		options: [
			{
					type:    'number',
					label:   'Offset (-450000 - 200)',
					id:      'audioptsoffset',
					min: -450000,
					max: 200,
					step: 1,
					default: 0,
					required: true,
					range: false,
			}
		],
	
		callback: function(action, bank) {
			let cmd = 'DB_ULRX1_AUDIO_PTS_OFFSET&value=' + action.options.audioptsoffset;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
		  
	};

	actionsArr.DB_ULRX1_MONITOR_OUTPUT = {
		label: 'Decoder2 Monitor Output',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Decoder2 monitori output',
				id:      'DB_ULRX1_MONITOR_OUTPUT',
				width:   12,
				default: 'DB_ULRX1_MONITOR_OUTPUT&value=SDI (decoder 1)',
				choices:	[
					{ id: 'DB_ULRX1_MONITOR_OUTPUT&value=ASI',		label: 'ASI' },
					{ id: 'DB_ULRX1_MONITOR_OUTPUT&value=SDI (decoder 1)',		label: 'SDI (decoder 1)' },
					{ id: 'DB_ULRX1_MONITOR_OUTPUT&value=SDI (decoder 2)',		label: 'SDI (decoder 2)' },
					{ id: 'DB_ULRX1_MONITOR_OUTPUT&value=SDI-top left',		label: 'SDI-top left' },
					{ id: 'DB_ULRX1_MONITOR_OUTPUT&value=SDI-top right',		label: 'SDI-top right' },
					{ id: 'DB_ULRX1_MONITOR_OUTPUT&value=SDI-bottom left',		label: 'SDI-bottom left' },
					{ id: 'DB_ULRX1_MONITOR_OUTPUT&value=SDI-bottom right',		label: 'SDI-bottom right' },
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.DB_ULRX0_MONITOR_OUTPUT;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};

	actionsArr.DB_ULRX1_OSD_ENABLE = {

		
		label: 'Decoder 2 Monitor Out OSD Enable',
		options: [
			{
				type: 'checkbox',
				label: 'Enable OSD on Mon out Dec2',
				id: 'DB_ULRX01_OSD_ENABLE',
				default: true
			}, 
			
			
		],
	
		callback: function(action, bank) {
	
			if(action.options.DB_ULRX1_OSD_ENABLE){
				let cmd = 'DB_ULRX1_OSD_ENABLE&value=On';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}else{
				let cmd = 'DB_ULRX1_OSD_ENABLE&value=Off';
				self.log('debug', 'CMD Send: ' + cmd);
				self.sendCommand(cmd);
			}		
		}
		  
	};
	actionsArr.DB_ULRX1_OSD_PID = {

		
		label: 'Decoder2 OSD PID',
		options: [
			{
					type:    'number',
					label:   'OSD PID (0 - 8190)',
					id:      'dec2osdpid',
					min: 0,
					max: 8190,
					step: 1,
					default: 8000,
					required: true,
					range: false,
			}
		],
	
		callback: function(action, bank) {
			let cmd = 'DB_ULRX1_OSD_PID&value=' + action.options.dec2osdpid;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
		  
	};
	actionsArr.DB_ULRX1_VIDEO_LOSS = {
		label: 'Decoder2 Video loss action',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Decoder2 video loss action',
				id:      'DB_ULRX1_VIDEO_LOSS',
				width:   12,
				default: 'DB_ULRX1_VIDEO_LOSS&value=Freeze',
				choices:	[
					{ id: 'DB_ULRX1_VIDEO_LOSS&value=Blue',		label: 'Blue' },
					{ id: 'DB_ULRX1_VIDEO_LOSS&value=Freeze',		label: 'Freeze' },
					{ id: 'DB_ULRX1_VIDEO_LOSS&value=Black',		label: 'Black' },
					{ id: 'DB_ULRX1_VIDEO_LOSS&value=Bars',		label: 'Bars' },
					
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.DB_ULRX0_VIDEO_LOSS;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};

	actionsArr.DB_ULRX1_HDR_MODE = {
		label: 'Decoder2 HDR mode',
		options: [
			{
				type:    'dropdown',
				label:   'Choose Decoder2 HDR mode',
				id:      'DB_ULRX1_HDR_MODE',
				width:   12,
				default: 'DB_ULRX1_HDR_MODE&value=Off',
				choices:	[
					{ id: 'DB_ULRX1_HDR_MODE&value=Off',		label: 'Off' },
					{ id: 'DB_ULRX1_HDR_MODE&value=On',		label: 'On' },
					{ id: 'DB_ULRX1_HDR_MODE&value=Auto',		label: 'Auto' },				
					
				]
			},
		],
		callback: function(action, bank) {
			let cmd = action.options.DB_ULRX0_HDR_MODE;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
	};

	actionsArr.DB_ULRX1_BREAKUP_DURATION = {

		
		label: 'Decoder2 Breakup duration',
		options: [
			{
					type:    'number',
					label:   'Breakup duration in ms(0 - 10000)',
					id:      'dec2breakupduration',
					min: 0,
					max: 10000,
					step: 1,
					default: 3000,
					required: true,
					range: false,
			}
		],
	
		callback: function(action, bank) {
			let cmd = 'DB_ULRX1_BREAKUP_DURATION&value=' + action.options.dec2breakupduration;
			self.log('debug', 'CMD Send: ' + cmd);
			self.sendCommand(cmd);
		}
		  
	};





}


	self.setActions(actionsArr);
}

instance.prototype.sendCommand = function(cmd) {
	let self = this;

	let prefix = 'mk2/lib/common/iframe.php?param=';

	if (cmd !== undefined) {
		self.system.emit('rest_get', 'http://' + self.config.host + '/' + prefix + cmd ,function (err, data, response) {
			if (err) {
				self.log('error', 'Error from ulrx: ' + response);
				return;
			}
		});
	}
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
