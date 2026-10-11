import { useState } from 'react';
import { LOCATIONS, PROVINCES } from './costaRicaLocations';
import { validateForm } from './checkoutValidation';

// Formulario con los datos del comprador y la entrega.
// El estado de los valores vive en CheckoutPage; aquí se validan y se editan.
export default function CheckoutForm({ values, onChange, onSubmit }) {
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validateForm(values);
  const errorCount = Object.keys(errors).length;

  // Un error se muestra cuando el usuario ya salió del campo o intentó continuar
  const errorFor = (name) => (touched[name] || submitted ? errors[name] : '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };

    // Al cambiar de provincia el cantón elegido antes ya no aplica
    if (name === 'province') next.canton = '';

    onChange(next);
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Si hay errores no se avanza y el foco va al primer campo con problema
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      document.getElementById(`checkout-${firstError}`)?.focus();
      return;
    }

    onSubmit();
  };

  // Atributos comunes de cada campo
  const fieldProps = (name) => ({
    id: `checkout-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(errorFor(name)),
    'aria-describedby': errorFor(name) ? `checkout-${name}-error` : undefined,
  });

  const renderError = (name) =>
    errorFor(name) ? (
      <p id={`checkout-${name}-error`} className="checkout-form__error" role="alert">
        {errorFor(name)}
      </p>
    ) : null;

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      {submitted && errorCount > 0 && (
        <p className="checkout-form__alert" role="alert">
          Revise los campos marcados, hay {errorCount} por corregir.
        </p>
      )}

      <fieldset className="checkout-form__section">
        <legend>Información del comprador</legend>

        <div className="checkout-form__field">
          <label htmlFor="checkout-fullName">Nombre completo</label>
          <input {...fieldProps('fullName')} type="text" autoComplete="name" />
          {renderError('fullName')}
        </div>

        <div className="checkout-form__row">
          <div className="checkout-form__field">
            <label htmlFor="checkout-email">Correo electrónico</label>
            <input {...fieldProps('email')} type="email" autoComplete="email" />
            {renderError('email')}
          </div>

          <div className="checkout-form__field">
            <label htmlFor="checkout-phone">Teléfono</label>
            <input {...fieldProps('phone')} type="tel" autoComplete="tel" />
            {renderError('phone')}
          </div>
        </div>
      </fieldset>

      <fieldset className="checkout-form__section">
        <legend>Información de entrega</legend>

        <div className="checkout-form__row">
          <div className="checkout-form__field">
            <label htmlFor="checkout-province">Provincia</label>
            <select {...fieldProps('province')}>
              <option value="">Seleccione una provincia</option>
              {PROVINCES.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {renderError('province')}
          </div>

          <div className="checkout-form__field">
            <label htmlFor="checkout-canton">Cantón</label>
            <select {...fieldProps('canton')} disabled={!values.province}>
              <option value="">Seleccione un cantón</option>
              {(LOCATIONS[values.province] ?? []).map((canton) => (
                <option key={canton} value={canton}>
                  {canton}
                </option>
              ))}
            </select>
            {renderError('canton')}
          </div>
        </div>

        <div className="checkout-form__field">
          <label htmlFor="checkout-address">Dirección exacta</label>
          <textarea {...fieldProps('address')} rows={3} autoComplete="street-address" />
          {renderError('address')}
        </div>

        <div className="checkout-form__field">
          <label htmlFor="checkout-notes">
            Indicaciones adicionales para la entrega{' '}
            <span className="checkout-form__optional">(opcional)</span>
          </label>
          <textarea {...fieldProps('notes')} rows={2} />
          {renderError('notes')}
        </div>
      </fieldset>

      <button type="submit" className="checkout-form__submit">
        Continuar a revisión
      </button>
    </form>
  );
}