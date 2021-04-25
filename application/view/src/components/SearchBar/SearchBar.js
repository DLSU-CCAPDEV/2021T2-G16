import React from "react";
import { Form, Formik, Field } from "formik";
import styles from "./SearchBar.module.css";

import { Division, FormDesign, RowDivision } from "../FormDesign/FormDesign";
import Search_Icon from "../../assets/Search.svg";

const SearchBar = () => {
  return (
    <FormDesign className={styles.SearchBar}>
      <Formik
        initialValues={{ searchKey: "" }}
        onSubmit={(searchData) => {
          const data = JSON.stringify(searchData, null, 2);
          alert(data);
        }}
      >
        <Form>
          <RowDivision className={styles.SearchBar_Submit}>
            <Field name="searchKey" type="text" placeholder="Search" />
            <Field type="submit" value="" />
          </RowDivision>
        </Form>
      </Formik>
    </FormDesign>
  );
};

export default SearchBar;
