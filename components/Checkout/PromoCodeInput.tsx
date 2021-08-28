export default function PromoCodeInput() {
  return (
    <form className="card p-2">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Promo code" />
        <button type="submit" className="btn btn-secondary">
          Redeem
        </button>
      </div>
    </form>
  );
}
