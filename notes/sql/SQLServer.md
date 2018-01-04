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
```sql
SELECT [列]
FROM [表]

GO

SELECT cr.Name AS CountryRegion, sp.Name StateProvinceName, a.*
FROM Person.Address a
INNER JOIN Person.StareProvince sp --内联接
ON sp.StateProvinceID = a.StateProvinceID
INNER JOIN Person.CountryRegion cr
ON cr.CountryRegionCode = sp.CountryRegionCode
WHERE a.city = 'Bothell'

GO

-- TOP语句 指定查询前X条结果
SELECT TOP [x] [列]
FROM [表]
```

### 数据更改
* `INSERT`插入数据
```sql
INSERT INFO Person.ContactType(Name, ModifiedDate)
VALUES('Test1', '2008-1-1')

GO

INSERT INFO Person.ContactType                     -- 不带列名的插入
VALUES('Test2', '2008-1-1')

GO

INSERT INFO Person.ContactType(ModifiedDate, Name) -- 重新排列了列名
VALUES('2008-1-1', 'Test3')

GO

-- INSERT和SELECT结合 将查询出的结果插入到表中
INSERT INFO Person.ContactType
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
* 
```sql
-- 使用RANK()函数排序
SELECT *,
	RANK()                    -- 使用RANK函数进行排名
	OVER(              
		PARTITION BY ClassID    -- 使用ClassID进行分组
		ORDER BY Mark DESE      -- 使用Mark进行排序
	) AS [Rank]
FROM Student

GO

-- 使用DENSE_RANK()函数排序
SELECT *,
	DENSE_RANK()              -- 使用使用DENSE_RANK函数进行排名
	OVER(              
		PARTITION BY ClassID    -- 使用ClassID进行分组
		ORDER BY Mark DESE      -- 使用Mark进行排序
	) AS [Rank]
FROM Student

-- 使用NTILE()函数进行分组
SELECT *,
	NTILE(2)             -- 按照Mark排序 分成2组
	OVER(              
		ORDER BY Mark DESE 
	) AS NewClass
FROM Student

GO

-- 使用ROW_NUMBER()函数获得排名
SELECT *,
	ROW_NUMBER()
	OVER(              
		ORDER BY Mark DESE 
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







