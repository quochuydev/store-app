export default function PromoCodeInput() {
  const styles = {
    redeem: {
      margin: 0,
    },
  };

  return (
    <form className="card p-2">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Promo code" />
        <button
          type="submit"
          className="btn btn-secondary"
          style={styles.redeem}
        >
          Redeem
        </button>
      </div>
    </form>
  );
}
