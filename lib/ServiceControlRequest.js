!function() {

	var   Class 		            = require('ee-class')
		, log 			            = require('ee-log')
        , RequestMessage            = require('distributed-request-message')
        , ServiceControlResponse    = require('./ServiceControlResponse')




    var   ServiceControlRequest
        , actions;




    // Actions available on the crud request
    actions = new RequestMessage.ActionSet([
          'execute_service'
        , 'stop_service'
    ]);


    


	ServiceControlRequest = module.exports = new Class({
        inherits: RequestMessage

        // expose actions
        , actions: actions


        // expose content class
        , response: ServiceControlResponse



        // the action to execute 
        , _action: null



         // action getter & setter
        , action: {
              get: actions.getter()
            , set: actions.setter()
        }


        /**
         * messaeg constructor
         */
		, init: function constructor(options) {


            // call super
            constructor.super.call(this, options);
		}




        /**
         * create a response for this message
         *
         * @param <Mixed> first object or any array or null found: content
         * @apram <Mixed> second object or first object in combination with null encountered: headers
         * @param <Mixed> first string encountered: status
         */
        , createResponse: function() {
            var message = new ServiceControlResponse();

            // validate, set flags
            this._prepareResponse(message, arguments);

            // return the message
            return message;
        }



        /**
         * returns a clean json representation of this object
         *
         * @returns <Object> object representation
         */
        , toJSON: function toJSON() {
            var json = toJSON.super.call(this);

            json.action = this.action;

            return json;
        }
	});




    // apply actions
    actions.applyTo(ServiceControlRequest);
}();
