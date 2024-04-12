import {Field, Form, Formik} from 'formik'
import css from './SearchBar.module.css'

const SearchBar = ({ onSubmit, searchQuery }) => {
    

  return (
      <Formik
      initialValues={{ query: searchQuery ?? "" }}
      onSubmit={(values, actions) => {
        onSubmit(values.query);
        actions.resetForm()
      }}
    >
      <Form className={css.form}>
        <Field className={css.input}  type="text" name="query" />
        <button className={css.btn} type="submit">Search</button>
      </Form>
    </Formik>
  )
}

export default SearchBar