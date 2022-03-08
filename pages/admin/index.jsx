export async function getServerSideProps({ req }) {
  if (!req.session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/admin/orders",
    },
  };
}

export default function AdminPage() {
  return null;
}
