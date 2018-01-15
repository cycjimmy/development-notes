# SQL Server

## TSQL操作
### 建立表格
```sql
-- 创建并初始化Student表
CREATE TABLE Student
(
	StudentID int,   -- 学号
	ClassID int,     -- 班级编号
	Mark int,        -- 成绩
)
```

### 数据查询
* 基本语法
```sql
SELECT [table fields list]
FROM [table names list]
WHERE [row constraints specification]
GROUP BY [grouping specification]
HAVING [grouping SELECTion specification]
ORDER BY [order rules specification]

-- TOP语句 指定查询前X条结果
SELECT TOP [x] [列]
FROM [表]
```

* 通用例子
```sql
SELECT cr.Name AS CountryRegion, sp.Name StateProvinceName, a.*
FROM Person.Address a
INNER JOIN Person.StareProvince sp --内联接
ON sp.StateProvinceID = a.StateProvinceID
INNER JOIN Person.CountryRegion cr
ON cr.CountryRegionCode = sp.CountryRegionCode
WHERE a.city = 'Bothell'

-- The classical T-SQL query!!!
SELECT SalesPersonID,OrderDate,Max(TotalDue) as MaximumTotalSales
FROM [Sales].[SalesOrderHeader]
WHERE SalesPersonID is not null and OrderDate >='2007/1/1'
ORDER BY SalesPersonID,OrderDate
HAVING Max(TotalDue)>150000
ORDER BY OrderDate DESC
```

* `WHERE`相关
```sql
SELECT * FROM [Sales].[SalesOrderHeader]
WHERE SalesPersonID=275

SELECT * FROM [Sales].[SalesOrderHeader]
WHERE SalesOrderNumber='so43670'

SELECT * FROM [Sales].[SalesOrderHeader]
WHERE TotalDue>5000

SELECT SalesOrderID,OrderDate,SalesPersonID,TotalDue as TotalSales
FROM [Sales].[SalesOrderHeader]
WHERE SalesPersonID=275 AND TotalDue>5000 --Comparison conditions: =,>,<,>=,<=,<>

SELECT SalesOrderID,OrderDate,SalesPersonID,TotalDue as TotalSales
FROM [Sales].[SalesOrderHeader]
WHERE SalesPersonID=275 AND TotalDue>5000 AND Orderdate between '2005-08-01' AND '1/1/2006'

SELECT SalesOrderID,OrderDate,SalesPersonID,TotalDue as TotalSales
FROM [Sales].[SalesOrderHeader]
WHERE SalesPersonID=275 AND TotalDue>5000 AND Orderdate >= '2005-08-01' AND Orderdate < '1/1/2006'

SELECT * FROM [Production].[Product]
WHERE name ='Mountain-100 Silver, 38'

SELECT * FROM [Production].[Product]
WHERE name like'Mountain'

SELECT * FROM [Production].[Product]
WHERE name like'%Mountain%' --Wildcard % matches any zero or more characters

SELECT * FROM [Production].[Product]
WHERE name like'mountain%' -- "_" matches any single character

SELECT * FROM [Production].[Product]
WHERE name like'_ountain%'

SELECT * FROM [Production].[Product]
WHERE color in ('red','white','black')

SELECT * FROM [Production].[Product]
WHERE size in ('60','61','62')

SELECT * FROM [Production].[Product]
WHERE class not in ('H') -- same as using: <> 'H'

SELECT * FROM [Production].[Product]
WHERE size is null

SELECT * FROM [Production].[Product]
WHERE size is not null

SELECT * FROM [Production].[Product]
WHERE color ='white'OR color ='black'

SELECT * FROM [Production].[Product]
WHERE color ='white'AND color ='black'

SELECT SalesOrderID,OrderDate,SalesPersonID,TotalDue as TotalSales
FROM [Sales].[SalesOrderHeader]
WHERE (SalesPersonID=275 OR SalesPersonID=278) AND TotalDue>5000
```

* 一些函数
```sql
-- ISNULL() 
SELECT ProductID, ISNULL(Color,'') as Color123, --using an alias
FROM Production.Product

-- CONVERT() 转换
SELECT ProductID, Name as ProductName, --using an alias
'The list price for ' + ProductNumber + ' is $ ' + CONVERT(varchar,ListPrice) +'.' , --using the concatenation to join character end-to-end.
'The list price for ' + ProductNumber + ' is $ ' + CONVERT(varchar,ListPrice) +'.' as [Description] --using brackets to let SQL server conside the strin as a column name
FROM Production.Product

-- COUNT() 返回目标个数
SELECT COUNT(SalesPersonID)
FROM [Sales].[SalesOrderHeader]
WHERE SalesPersonID IS NOT NULL

-- DISTINCT() 返回不重复的目标个数
SELECT DISTINCT(SalesPersonID)
FROM [Sales].[SalesOrderHeader]
WHERE SalesPersonID IS NOT NULL

-- Math函数
SELECT BusinessEntityID
,rate*40*52 as AnnualSalary
,round(rate*40*52,1) as AnnualSalary
,round(rate*40*52,0) as AnnualSalary
FROM [HumanResources].[EmployeePayHistory]

SELECT AVG(TotalDue) as AverageTotalSales
,MIN(TotalDue) as MinimumTotalSales
,MAX(TotalDue) as MaximumTotalSales
,SUN(TotalDue) as SummaryTotalSales
FROM [Sales].[SalesOrderHeader]

SELECT BusinessEntityID
,(rate+5)*40*52 as AnnualSalary
FROM [HumanResources].[EmployeePayHistory]
```

### 数据更改
* `INSERT`插入数据
```sql
INSERT INTO Person.ContactType(Name, ModifiedDate)
VALUES('Test1', '2008-1-1')

GO

INSERT INTO Person.ContactType                     -- 不带列名的插入
VALUES('Test2', '2008-1-1')

GO

INSERT INTO Person.ContactType(ModifiedDate, Name) -- 重新排列了列名
VALUES('2008-1-1', 'Test3')

GO

-- INSERT和SELECT结合 将查询出的结果插入到表中
INSERT INTO Person.ContactType
(
	Name, 
	ModifiedDate
)
SELECT at.Name, at.ModifiedDate
FROM Person.AddressType at
```

* `UPDATE`更新语句
```sql
UPDATE Person.contactType
SET Name='--'+Name
WHERE ContactTypeID>20    --只更新ID大于20的数据，其他不变

GO

-- 将AddressType的rowguid更新到ContactType
UPDATE Person.contactType
SET Name=at.rowguid
FROM Person.ContactType ct
INNER JOIN Person.AddressType at
ON ct.Name=at.Name

GO

-- 使用TOP语句 更新查询前X条结果
UPDATE TOP(2) Person.contactType
SET Name=ContactTypeID
WHERE ContactTypeID>20
```

* `DELETE`删除语句
```sql
DELETE FROM Person.ContactType
WHERE ContactTypeID>20

GO

DELETE FROM Person.ContactType
FROM Person.ContactType ct
INNER JOIN Person.AddressType at  -- 通过内联接后再删除
ON ct.Name=at.Name

GO

DELETE TOP(50)    -- 只删除匹配的头50条数据
FROM Person.ContactType
WHERE ContactTypeID>20
```

### 数据排序
```sql
-- 查询返回
SELECT ProductID, Name, ProductNumber, Color, Size, ListPrice
FROM Production.Product
ORDER BY listprice DESC,Name  --desc=descending order; asc=ascending order


-- 使用RANK()函数排序
SELECT *,
	RANK()                    -- 使用RANK函数进行排名
	OVER(              
		PARTITION BY ClassID    -- 使用ClassID进行分组
		ORDER BY Mark DESC      -- 使用Mark进行排序
	) AS [Rank]
FROM Student

GO

-- 使用DENSE_RANK()函数排序
SELECT *,
	DENSE_RANK()              -- 使用使用DENSE_RANK函数进行排名
	OVER(              
		PARTITION BY ClassID    -- 使用ClassID进行分组
		ORDER BY Mark DESC      -- 使用Mark进行排序
	) AS [Rank]
FROM Student

-- 使用NTILE()函数进行分组
SELECT *,
	NTILE(2)             -- 按照Mark排序 分成2组
	OVER(              
		ORDER BY Mark DESC
	) AS NewClass
FROM Student

GO

-- 使用ROW_NUMBER()函数获得排名
SELECT *,
	ROW_NUMBER()
	OVER(              
		ORDER BY Mark DESC
	) AS OrderID
FROM Student
```

### 数据分页
```sql
-- 使用CTE和ROW_NUMBER()进行数据库分页
WITH c AS    -- 定义CTE
(
	SELECT *, ROW_NUMBER()
	OVER(
		ORDER BY CustomerID
	) AS RowID
	FROM Sales.vIndividualCustomer
	WHERE CountryRegionName='United States'
)
SELETE * 
FROM c       -- 使用CTE
WHERE RowID>50 AND RowID<=60
```

### 异常处理
```sql
-- 以下异常处理代码单独执行
BEGIN TRY
	INSERT INTO t1 VALUES(1, 'same')
END TRY
BEGIN CATCH
	SELECT ERROR_LINE(), ERROR_SEVERITY(), ERROR_MESSAGE()  -- 输出异常内容
END CATCH
```

### 其他
* `APPLY` 表与函数的联接
```sql
SELETE p.usecounts, p.cacheobjtype, p.objtype, s.text
FROM sys.dm_exec_cached_plans p
CROSS APPLY sys.dm_exec_sql_text(plan_handle) s 
```

* 使用PIVOT行转列
```sql
SELECT ID, Name,
[1] as '一季度',
[2] as '二季度',
[3] as '三季度',
[4] as '四季度',
FROM
ProductSale
PIVOT    -- 进行行转列操作
(
	sum(Sale)
	for Quarter in
	([1],[2],[3],[4])
)
as pvt
```

* 使用UNPIVOT列转行
```sql
SELECT ID, Name, Quarter, Sale
FROM ProductSale
UNPIVOT    -- 进行列转行操作
(
	Sale
	for Quarter in
	([Q1],[Q2],[Q3],[Q4])
)
as unpvt
```

* `OUTPUT`输出函数
```sql
-- 输出删除的数据
DELETE FROM Student
OUTPUT deleted.*     
WHERE StudentID = 1

GO

-- 输出INSERT结果
INSERT INTO Student
OUTPUT INSERTED.*     --输出插入的行
VALUES(1,1,91)

GO

-- 输出UPDATE结果
UPDATE Student
SET Mark=90
OUTPUT
DELETED.StudentID AS OldStudentID,  -- 输出更新操作时原来的数据
DELETED.ClassID AS OldClassID,
DELETED.Mark AS OldMark,
INSERTED.StudentID AS NewStudentID, -- 输出更新后的数据
INSERTED.ClassID AS NewClassID,
INSERTED.Mark AS NewMark,
WHERE StudentID=1

GO

-- 删除数据到备份表
DELETE FROM Student
OUTPUT deleted.* INTO StudentDeleted -- 将数据从Student表删除，删除的数据插入到StudentDeleted表 
WHERE StudentID = 1
```

* `TABLESAMPLE` 函数
```sql
SECECT *
FROM Person.Contact
TABLESAMPLE (10 PERCENT)    -- 获取10%的数据

GO

SECECT *
FROM Person.Contact
TABLESAMPLE (200 ROWS)    -- 获取大约200行数据
```







