(() => {
  const simulators = document.querySelectorAll("[data-tax-simulator]");
  if (!simulators.length) return;

  const euro = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const formatAmount = (amount) => `${euro.format(amount)}\u00a0€`;

  simulators.forEach((simulator) => {
    const input = simulator.querySelector("input[type=number]");
    const amountNodes = simulator.querySelectorAll("[data-simulator-amount]");
    if (!input) return;

    const updateSimulator = () => {
      const amount = Math.max(0, Number.parseFloat(input.value) || 0);
      const values = {
        heading: amount,
        "don-professional": amount,
        "reduction-professional": amount * 0.6,
        "total-professional": amount - amount * 0.6,
        "don-individual": amount,
        "reduction-individual": amount * 0.66,
        "total-individual": amount - amount * 0.66,
      };

      amountNodes.forEach((node) => {
        node.textContent = formatAmount(values[node.dataset.simulatorAmount]);
      });
    };

    input.addEventListener("input", updateSimulator);
    input.addEventListener("change", updateSimulator);
    input.addEventListener("keyup", updateSimulator);
    updateSimulator();
  });
})();
