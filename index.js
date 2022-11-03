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
		}
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
