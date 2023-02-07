const { createApp } = Vue

import images from "./images.js";

createApp({
	data()
	{
		return {
			// Image data
			images: images,

			// Base character (base|base_no_legs)
			baseKey: 'base',

			currentLayers: [],

			layersToLoop: [
				'character_appearances',
				'items_on_character',
				'base',
			],

			showNames: false,

			backgroundsCount: 9,

			currentBg: 1,
		}
	},
	computed:
	{
		layerKeys() {
			return;
		}
	},
	methods:
	{
		getImgDir(group, key) {
			const filename = images[group][key];
			return `assets/img/${group}/${filename}`;
		},

		addLayer(group, key) {
			if ( !this.tryRemoveLayer(group, key) )
			{
				// New layer, can add
				this.currentLayers.push( { group, key } );
			}
		},

		addBackLayer(group, key) {
			// nope, decided to go for the much simpler approach of adding
			// a base potato as the last item
		},

		// Returns true if the layer was removed
		tryRemoveLayer(group, key) {
			// Check if the layer was already added; if so, get its index
			const newLayerIndex = this.getLayerIndex(group, key);

			if ( newLayerIndex !== -1 )
			{
				// Layer already added, remove
				this.currentLayers.splice( newLayerIndex, 1 );
				return true;
			}

			return false;
		},

		clearLayers() {
			this.currentLayers = [];
		},

		undoLayer() {
			this.currentLayers.pop();
		},

		toggleNames() {
			this.showNames = !this.showNames;
		},

		getLayerIndex(group, key) {
			const foundIndex = Object.entries(this.currentLayers).findIndex( ( item ) => {
				const currGroup = item[1].group;
				const currKey = item[1].key;
				const match = ( ( group === currGroup ) && ( key === currKey ) );
				return match;
			});

			return foundIndex;
		},

		hasLayer(group, key) {
			return ( this.getLayerIndex(group, key) !== -1 );
		},

		applyBackground(num) {
			this.currentBg = num;
		},

	}
}).mount('#app');
