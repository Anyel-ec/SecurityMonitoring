Table Category {
  categoryid SERIAL [primary key, not null]
  categoryname varchar(15) [not null]
  description text
  picture bytea
}

Table Region {
  regionid int [primary key, not null]
  regiondescription varchar(50) [not null]
}

Table Territory {
  territoryid varchar(20) [primary key, not null]
  territorydescription varchar(50) [not null]
  regionid int [not null]
}

Table CustomerCustomerDemographic {
  customerid varchar(5) [not null, primary key]
  customertypeid varchar(10) [not null, primary key]
}

Table CustomerDemographic {
  customertypeid varchar(10) [primary key, not null]
  customerdesc text
}

Table Customer {
  custid SERIAL [primary key, not null]
  companyname varchar(40) [not null]
  contactname varchar(30)
  contacttitle varchar(30)
  address varchar(60)
  city varchar(15)
  region varchar(15)
  postalcode varchar(10)
  country varchar(15)
  phone varchar(24)
  fax varchar(24)
}

Table Employee {
  empid SERIAL [primary key, not null]
  lastname varchar(20) [not null]
  firstname varchar(10) [not null]
  title varchar(30)
  titleofcourtesy varchar(25)
  birthdate timestamp
  hiredate timestamp
  address varchar(60)
  city varchar(15)
  region varchar(15)
  postalcode varchar(10)
  country varchar(15)
  phone varchar(24)
  extension varchar(4)
  photo bytea
  notes text
  mgrid int
  photopath varchar(255)
}

Table EmployeeTerritory {
  employeeid int [not null, primary key]
  territoryid varchar(20) [not null, primary key]
}

Table Product {
  productid SERIAL [primary key, not null]
  productname varchar(40) [not null]
  supplierid int
  categoryid int
  quantityperunit varchar(20)
  unitprice decimal(10, 2)
  unitsinstock smallint
  unitsonorder smallint
  reorderlevel smallint
  discontinued char(1) [not null]
}

Table Shipper {
  shipperid SERIAL [primary key, not null]
  companyname varchar(40) [not null]
  phone varchar(44)
}

Table Supplier {
  supplierid SERIAL [primary key, not null]
  companyname varchar(40) [not null]
  contactname varchar(30)
  contacttitle varchar(30)
  address varchar(60)
  city varchar(15)
  region varchar(15)
  postalcode varchar(10)
  country varchar(15)
  phone varchar(24)
  fax varchar(24)
  homepage text
}

Table SalesOrder {
  orderid SERIAL [primary key, not null]
  custid varchar(15)
  empid int
  orderdate timestamp
  requireddate timestamp
  shippeddate timestamp
  shipperid int
  freight decimal(10, 2)
  shipname varchar(40)
  shipaddress varchar(60)
  shipcity varchar(15)
  shipregion varchar(15)
  shippostalcode varchar(10)
  shipcountry varchar(15)
}

Table OrderDetail {
  orderid int [not null, primary key]
  productid int [not null, primary key]
  unitprice decimal(10, 2) [not null]
  qty smallint [not null]
  discount decimal(10, 2) [not null]
}

Ref: Territory.regionid > Region.regionid
Ref: EmployeeTerritory.territoryid > Territory.territoryid
Ref: EmployeeTerritory.employeeid > Employee.empid
Ref: Product.categoryid > Category.categoryid
Ref: Product.supplierid > Supplier.supplierid
Ref: SalesOrder.custid > Customer.custid
Ref: SalesOrder.empid > Employee.empid
Ref: SalesOrder.shipperid > Shipper.shipperid
Ref: OrderDetail.orderid > SalesOrder.orderid
Ref: OrderDetail.productid > Product.productid

Ref: CustomerCustomerDemographic.customerid > Customer.custid
Ref: CustomerCustomerDemographic.customertypeid > CustomerDemographic.customertypeid



Ref: "Employee"."firstname" < "Employee"."birthdate"