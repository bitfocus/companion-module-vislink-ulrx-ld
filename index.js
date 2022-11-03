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
