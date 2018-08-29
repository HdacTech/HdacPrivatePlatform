Hdac private platform
======================

### License

Hdac private platform is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Copyright (c) 2018 Hdac Technology AG


### Execution environment 

Hdac private platform is configured using Spring Framework.
>- Web server (apache, nginx) (optional)
>- WAS (tomcat, resin, etc)
>- RDBMS (maria DB, mysql, etc)


### How to install 

>1. Install WAS on the server (If necessary, install web server) 
>2. When using ant, copy the source file to the compile area. 
>3. Run ant and copy the compiled class file to root of WAS (ROOT/WEB-INF/)
>4. Copy jsp to root of WAS (ROOT/)
>5. Copy web contents to web root (explorer sub css, js)


### Modifying the config file 

>1. RPC server information to connect - ROOT/WEB-INF/classes/config/hdac-rpc.properties
>2. RDBMS connection information - ROOT / WEB-INF / classes / config / mybatis-config.xml

※This source has been tested in centOS 7.0, apache 2.4.x, tomcat 8.x, mariaDB environments. 


### Using

>1. Create new account by "join" and login through that u made.
>2. Select a destination account and send coins. it's possible send with additional data also.
>3. You can look up the information of list of blocks, blockchain, txid, balance of your account through the menu. 


### Database

Documentation of Database table information can be found int the [docs](docs) directory.