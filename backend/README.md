Backend:

- Run build backend app it will fail Download and create Mysql database use docker or just localy Create a Table “snap-sort”

- go to environment variables
- SnapSortApplication > Edit Configuration > Environment variables
- and type in the filed your database data example data: 
db_password=123;db_port=3307;db_username=root;db_name=snap-sort

- Build and run app it should start at port 8080 