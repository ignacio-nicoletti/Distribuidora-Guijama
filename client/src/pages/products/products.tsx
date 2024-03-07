import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./products.module.css";
import SearchBar from "../../components/searchBar/searchBar";
import Pagination from "../../components/pagination/pagination";
import InstanceOfAxios from "../../utils/intanceAxios";
import Swal from "sweetalert2";
import AddProductModal from "../../components/modals/modalProduct/modalAddProduct";
import EditProductModal from "../../components/modals/modalEditProduct/modalEditProduct";
import { GetDecodedCookie } from "../../utils/DecodedCookie";

interface Product {
  _id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  brand: string;
  stock: number;
  priceList: number;
  priceCost: number;
  image: [];
  sales: {};
}

interface ProductsProps {
  data: Product[];
}

const ProductsPage: React.FC<ProductsProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const initialFilters: Record<keyof Product, string> = {
    code: "",
    title: "",
    category: "",
    brand: "",
    stock: "",
    description: "",
    priceCost: "",
    priceList: "",
    image: "",
    sales: "",
    _id: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [productSelect, setProductSelect] = useState<Product | null>(null);

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
      return (
        value.toLowerCase() === "" || productValue.includes(value.toLowerCase())
      );
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

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = GetDecodedCookie("cookieToken");
        InstanceOfAxios(`/products/${id}`, "DELETE", undefined, token);
        Swal.fire("¡Eliminado!", "El cliente ha sido eliminado.", "success");
      }
    });
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Slice the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const slicedProducts = currentProducts
    .filter(applyFilters)
    .filter(
      (product) =>
        searchTerm === "" ||
        Object.values(product).some((value) =>
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
          options={Array.from(
            new Set(currentProducts.map((product) => product.code))
          )}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Código" />}
          onChange={(event, value) => handleFilterChange(event, value, "code")}
        />
        <Autocomplete
          disablePortal
          id="combo-box-titulo"
          options={Array.from(
            new Set(currentProducts.map((product) => product.title))
          )}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Título" />}
          onChange={(event, value) => handleFilterChange(event, value, "title")}
        />
        <Autocomplete
          disablePortal
          id="combo-box-rubro"
          options={Array.from(
            new Set(currentProducts.map((product) => product.category))
          )}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Rubro" />}
          onChange={(event, value) =>
            handleFilterChange(event, value, "category")
          }
        />
        <Autocomplete
          disablePortal
          id="combo-box-marca"
          options={Array.from(
            new Set(currentProducts.map((product) => product.brand))
          )}
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
            <th>Costo</th>
            <th>Venta</th>
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
              <td>${product.priceCost}</td>
              <td>${product.priceList}</td>
              <td>
                <button
                  className={styles.buttonEdit}
                  onClick={() => {
                    setShowModalEdit(true);
                    setProductSelect(product);
                  }}
                >
                  <EditIcon />
                </button>
              </td>
              <td>
                <button
                  className={styles.buttonDelete}
                  onClick={() => handleDelete(product._id)}
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
        <button className={styles.buttonAdd} onClick={() => setShowModal(true)}>
          Agregar nuevo producto
        </button>
        <button className={styles.buttonModify}>
          Modificar precios x Rubro
        </button>
      </div>
      <AddProductModal
        open={showModal}
        handleClose={() => setShowModal(false)}
      />
      {productSelect && (
        <EditProductModal
          open={showModalEdit}
          productSelect={productSelect}
          handleClose={() => setShowModalEdit(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
