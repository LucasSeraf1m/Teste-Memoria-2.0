class Api {
    static async LoginUserApi(novoJSON) {
      try {
        const response = await fetch("http://localhost:2000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoJSON),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Redirecionar para a página protegida ou fazer outras ações necessárias
          console.log(data);
        } else {
          throw new Error("Erro ao inserir os dados");
        }
      } catch (error) {
        console.error("Erro ao inserir os dados:", error);
        // Lide com o erro adequadamente
      }
    }
  }
  
  export default Api;