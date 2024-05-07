export function printDiv(divId: string) {
  const css = `<script src="https://cdn.tailwindcss.com"></script>`;
  const printContents = (document.getElementById(divId) as HTMLElement)
    .innerHTML;
  const pageContent = `<!DOCTYPE html><html><head>${css}</head><body onload="window.print()">${printContents}</html>`;
  let popupWindow: Window;
  if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    popupWindow = window.open(
      "",
      "_blank",
      "width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
    )!;
    popupWindow.window.focus();
    popupWindow.document.write(pageContent);
    popupWindow.document.close();
    popupWindow.onbeforeunload = (event) => {
      popupWindow.close();
    };
    popupWindow.onabort = (event) => {
      popupWindow.document.close();
      popupWindow.close();
    };
  } else {
    popupWindow = window.open("", "_blank", "width=600,height=600")!;
    popupWindow.document.open();
    popupWindow.document.write(pageContent);
    popupWindow.document.close();
  }
}
