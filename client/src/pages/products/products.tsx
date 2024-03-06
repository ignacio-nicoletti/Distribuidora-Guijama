import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./products.module.css";
import SearchBar from "../../components/searchBar/searchBar";
import Pagination from "../../components/pagination/pagination";
import InstanceOfAxios from "../../utils/intanceAxios";

interface Product {
  code: string;
  title: string;
  category: string;
  description: string;
  brand: string;
  stock: number;
  priceList: number;
  priceCost: number;
}

interface ProductsProps {
  data: Product[];
}

const ProductsPage: React.FC<ProductsProps> = ({ data }) => {
  const initialFilters: Record<keyof Product, string> = {
    code: "",
    title: "",
    category: "",
    brand: "",
    stock: "",
    description: "",
    priceCost: "",
    priceList: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await InstanceOfAxios("/products", "GET");
        setCurrentProducts(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = (product: Product) => {
    return Object.entries(filters).every(([key, value]) => {
      const productValue = String(product[key as keyof Product]).toLowerCase();
      return value.toLowerCase() === "" || productValue.includes(value.toLowerCase());
    });
  };

  const handleFilterChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
    field: keyof Product
  ) => {
    setFilters({
      ...filters,
      [field]: value || "",
    });
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleEdit = (code: string) => {
    console.log(`Edit product with code ${code}`);
  };

  const handleDelete = (code: string) => {
    console.log(`Delete product with code ${code}`);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Slice the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const slicedProducts = currentProducts
    .filter(applyFilters)
    .filter(product =>
      searchTerm === "" ||
      Object.values(product).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>Listado de productos</h1>
      <div className={styles.filters}>
        <Autocomplete
          disablePortal
          id="combo-box-codigo"
          options={Array.from(new Set(currentProducts.map((product) => product.code)))}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Código" />}
          onChange={(event, value) => handleFilterChange(event, value, "code")}
        />
        <Autocomplete
          disablePortal
          id="combo-box-titulo"
          options={Array.from(new Set(currentProducts.map((product) => product.title)))}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Título" />}
          onChange={(event, value) => handleFilterChange(event, value, "title")}
        />
        <Autocomplete
          disablePortal
          id="combo-box-rubro"
          options={Array.from(new Set(currentProducts.map((product) => product.category)))}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Rubro" />}
          onChange={(event, value) => handleFilterChange(event, value, "category")}
        />
        <Autocomplete
          disablePortal
          id="combo-box-marca"
          options={Array.from(new Set(currentProducts.map((product) => product.brand)))}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Marca" />}
          onChange={(event, value) => handleFilterChange(event, value, "brand")}
        />
        <SearchBar onSearch={handleSearch} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Rubro</th>
            <th>Marca</th>
            <th>Stock</th>
            <th>Precio Costo</th>
            <th>Precio Venta</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {slicedProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.code}</td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.stock}</td>
              <td>{product.priceCost}</td>
              <td>{product.priceList}</td>
              <td>
                <button
                  className={styles.buttonEdit}
                  onClick={() => handleEdit(product.code)}
                >
                  <EditIcon />
                </button>
              </td>
              <td>
                <button
                  className={styles.buttonDelete}
                  onClick={() => handleDelete(product.code)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={slicedProducts.length}
        itemsPerPage={productsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
      <div className={styles.buttonsFooter}>
        <button className={styles.buttonAdd}>Agregar nuevo producto</button>
        <button className={styles.buttonModify}>
          Modificar precios x Rubro
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
