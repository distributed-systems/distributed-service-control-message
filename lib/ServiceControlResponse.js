!function() {

    var   Class                 = require('ee-class')
        , type                  = require('ee-types')
        , log                   = require('ee-log')
        , RequestMessage        = require('distributed-request-message');


    var   ServiceControlResponse
        , statuses;




    statuses = new RequestMessage.StatusSet([
          'ok'
        , 'error'
        , 'invalid_action'
        , 'invalid_content'
        , 'service_temporarily_unavailable'
        , 'service_version_unavailable'
        , 'service_unavailable'
        , 'application_unavailable'
        , 'invalid_recipient'
    ]);

    

    // the actual crudmessage class implementation
    ServiceControlResponse = module.exports = new Class({
        inherits: RequestMessage.Response


        // status codes
        , statuses: statuses



        // response status
        , _status: null



        // status getter & setter
        , status: {
              get: statuses.getter()
            , set: statuses.setter()
        }



        /**
         * class constructor
         */
        , init: function init(options) {
            if (options && options.status) this.status = options.status;

            init.super.call(this, options);
        }




        /**
         * returns a clean json representation of this object
         *
         * @returns <Object> object representation
         */
        , toJSON: function toJSON() {
            var json = toJSON.super.call(this);

            json.status = this.status;

            return json;
        }
    });



    // apply statusvcodes to class construcztor
    statuses.applyTo(ServiceControlResponse);
}();
