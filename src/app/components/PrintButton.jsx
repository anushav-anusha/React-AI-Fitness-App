
export default function PrintButton() {
  const handlePrint = () => {
    const table = document.querySelector(".plan-table");
    if (!table) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const style = `
      <style>
        table { width: 100%; border-collapse: collapse; font-family: sans-serif; }
        th, td { border: 1px solid #333; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
      </style>
    `;

    printWindow.document.write(`<html><head>${style}</head><body>`);
    printWindow.document.write(table.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return <button onClick={handlePrint}>Print Plan</button>;
}
