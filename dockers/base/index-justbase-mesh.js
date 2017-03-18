var HOST =  'seneca-base';
var BASES = ('seneca-base:39000,seneca-base:39001').split(',');

require('seneca')()//({log: 'silent'})
  .use('mesh',{
    bases: BASES,
    host: HOST,
    monitor: true,
    tag: null
  })
