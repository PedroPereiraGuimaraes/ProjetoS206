const { remote } = require('webdriverio');
async function main() {
    const caps = { "platformName": "android", "appium:automationName": "uiautomator2", "appium:platformVersion": "14", "appium:deviceName": "emulator-5554", "appium:app": "C:\\Users\\ppg10\\Downloads\\app-release.apk", "appium:ensureWebviewsHavePages": true, "appium:nativeWebScreenshot": true, "appium:newCommandTimeout": 3600, "appium:connectHardwareKeyboard": true }
    const driver = await remote({
        protocol: "http",
        hostname: "127.0.0.1",
        port: 4723,
        path: "/",
        capabilities: caps
    });

    try {
        // Teste 1: Abrir o aplicativo
        await driver.pause(1000); // Aguardar 3 segundos (ajuste conforme necessário)

        // Teste 2: Clicar em um botão
        const botao = await driver.$('//android.widget.CheckBox');
        await botao.click();
        const isChecked = await botao.getAttribute('checked');

        // Verifique o estado do botão
        if (isChecked === 'true') {
            console.log('O botão de alternância está pressionado.');
        } else {
            console.log('O botão de alternância não está pressionado.');
        }

        // Teste 3:
        const semCadastro = await driver.$('//android.view.View[@content-desc="NÃO POSSUO CADASTRO"]');
        await semCadastro.click();
        const senha = await driver.$('//android.widget.ScrollView/android.widget.EditText[5]');
        const textoDaSenha = await senha.getText();

        if (textoDaSenha.trim() === '') {
            console.log('A linha de texto está vazia.');
        } else {
            console.log('A linha de texto não está vazia.');
        }
        // Adicione mais testes conforme necessário

    } catch (e) {
        console.error(e);
    } finally {
        await driver.deleteSession();
    }
}

main().catch(console.log);