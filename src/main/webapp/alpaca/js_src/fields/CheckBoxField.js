(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.CheckBoxField = Alpaca.ControlField.extend(
    /**
     * @lends Alpaca.Fields.CheckBoxField.prototype
     */
    {
        /**
         * @constructs
         * @augments Alpaca.ControlField
         *
         * @class Checkbox control for JSON schema boolean type.
         *
         * @param {Object} container Field container.
         * @param {Any} data Field data.
         * @param {Object} options Field options.
         * @param {Object} schema Field schema.
         * @param {Object|String} view Field view.
         * @param {Alpaca.Connector} connector Field connector.
         * @param {Function} errorCallback Error callback.
         */
        constructor: function(container, data, options, schema, view, connector, errorCallback) {
            this.base(container, data, options, schema, view, connector, errorCallback);
        },

        /**
         * @see Alpaca.Field#setup
         */
        setup: function() {
            this.base();
            
            if (!this.options.rightLabel) {
                this.options.rightLabel = "";
            }           
        },
        
        /**
         * @see Alpaca.ControlField#renderField
         */
        renderField: function(onSuccess) {
            var controlFieldTemplate = this.view.getTemplate("controlFieldCheckbox");
            
            if (controlFieldTemplate) {
				this.field = $.tmpl(controlFieldTemplate, {
					"id": this.getId(),
					"options": this.options
				});
				this.injectField(this.field);
				this.field = $('input[id="' + this.getId() + '"]', this.field);
			}
            
            if (onSuccess) {
                onSuccess();
            }
        },
		
        /**
         * @see Alpaca.ControlField#postRender
         */
        postRender: function() {
            this.base();
			if (this.fieldContainer) {
				this.fieldContainer.addClass('alpaca-controlfield-checkbox');
			}
        },		

        /**
         * @see Alpaca.Field#getValue
         */
        getValue: function() {
            return this.field.attr("checked") ? true : false;
        },
        
        /**
         * @see Alpaca.Field#setValue
         */
        setValue: function(value) {
            if (value) {
                this.field.attr({
                    "checked": true
                });
            } else {
                this.field.attr({
                    "checked": false
                });
            }
            // be sure to call into base method
            this.base(value);
        },
        
        /**
         * @see Alpaca.Field#disable
         */
        disable: function() {
            this.field.disabled = true;
        },
        
        /**
         * @see Alpaca.Field#enable
         */
        enable: function() {
            this.field.disabled = false;
        },
		
        /**
         * @private
         * @see Alpaca.ControlField#getSchemaOfOptions
         */
		getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(),{
				"properties": {
					"rightLabel": {
						"title": "Option Label",
						"description": "Option label",
						"type": "string"
					}
				}
			});
		},

        /**
         * @private
         * @see Alpaca.ControlField#getOptionsForOptions
         */
		getOptionsForOptions: function() {
            return Alpaca.merge(this.base(),{
				"fields": {
					"rightLabel": {
						"type": "text"
					}
				}
			});
		},
				
		/**
         * @see Alpaca.Field#getTitle
		 */
		getTitle: function() {
			return "Checkbox Field";
		},
		
		/**
         * @see Alpaca.Field#getDescription
		 */
		getDescription: function() {
			return "Checkbox Field.";
		},

		/**
         * @see Alpaca.Field#getType
         */
        getType: function() {
            return "boolean";
        },

		/**
         * @see Alpaca.Field#getFieldType
         */
        getFieldType: function() {
            return "checkbox";
        }
        
    });
    
    Alpaca.registerTemplate("controlFieldCheckbox", '<span><input type="checkbox" id="${id}" {{if options.readonly}}readonly="readonly"{{/if}} {{if options.name}}name="${options.name}"{{/if}} {{each(i,v) options.data}}data-${i}="${v}"{{/each}}/>{{if options.rightLabel}}<label for="${id}">${options.rightLabel}</label>{{/if}}</span>');
    
    Alpaca.registerFieldClass("checkbox", Alpaca.Fields.CheckBoxField);
    Alpaca.registerDefaultSchemaFieldMapping("boolean", "checkbox");
})(jQuery);
