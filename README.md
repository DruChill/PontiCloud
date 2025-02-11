<div align="center">

<a href="http://ponticloud.web.app/">
  <img width="300px" src="https://github.com/DruChill/PontiCloud/blob/main/public/icon-readme.png?raw=true" alt="Logo" />
</a>

# 🌩️ PontiCloud

**Sube y descarga archivos de la universidad sin necesidad de registrarte.**  
Todos los archivos subidos son visibles para todos los usuarios y se eliminan automáticamente cada mes.  

📢 [Reportar un error](https://github.com/DruChill/PontiCloud/issues) • 💡 [Sugerir una mejora](https://github.com/DruChill/PontiCloud/issues)

</div>

## 🚀 Características principales

✔️ **Sin cuenta**: No necesitas registrarte.  
✔️ **Acceso público**: Los archivos subidos son visibles para todos los usuarios.  
✔️ **Fácil y rápido**: Sube tu archivo en segundos y descárgalo cuando lo necesites.  
✔️ **Compatibilidad**: Admite formatos como **RAR, Word, Excel, PDF, JPG, PNG, GIF, etc.**  
✔️ **Eliminación automática**: Los archivos se eliminan después de **un mes**.  

> ⚠️ **Nota:** Solo para archivos de trabajo. Tamaño máximo permitido: **50 MB**.

## 📌 ¿Cómo usar?

1. **Sube tu archivo** desde la web.  
2. **Se añadirá automáticamente a la tabla pública** visible para todos los usuarios.  
3. **Descárgalo cuando lo necesites** antes de que sea eliminado.  

## 📄 Licencia

Este proyecto está bajo la licencia MIT. ¡Siéntete libre de contribuir!

<!-- - **Propia nube**: Pronto, nos estamos enfocando en mejorar la experiencia del usuario en ponticloud. StudentCloud aun esta en desarrollo. -->


<!-- ## Para empezar

---
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
---



### Prerequisitos

- NVM (recomendado para asegurar versión de Node) ver [documentación oficial](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

  ```sh
  nvm use
  # o
  nvm use <version>
  ```

  > Si quieres automatizar el proceso, puedes crear un script siguiendo la [documentación oficial](https://github.com/nvm-sh/nvm?tab=readme-ov-file#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

<details>
	<summary>Pequeño script de automatización</summary>
	
- For Linux/MacOS:
	```sh
	# .bashrc | .zshrc | cualquier archivo de configuración
	# pequeño script para cambiar de version al entrar al directorio
	cd() {
  builtin cd "$@"
		if [[ -f .nvmrc ]]; then
			nvm use > /dev/null
			# Si quieres que te diga la versión
			nvm use
		fi
	}
	```

- For Windows:

  ```powershell
  # $PROFILE
  function Change-Node-Version {
  	param($path)
  	& Set-Location $path
  	$pwd = pwd
  	if ( Test-Path "$pwd\\.nvmrc" ) {
  		$version = Get-Content .nvmrc
  		nvm use $version
  	}
  }
  New-Alias -Name cd -Value Change-Node-Version -Force -Option AllScope
  ```

  </details>

- PNPM (es nuestra recomendación por su eficiencia y rapidez)

  ```sh
  npm install -g pnpm
  ```

- o NPM

  ```sh
  npm install npm@latest -g
  ```

### Instalación

1. Clona el repositorio

   ```sh
   git clone https://github.com/midudev/la-velada-web-oficial.git
   ```

2. Instala los paquetes de NPM

   ```sh
   pnpm install
   ```

3. Ejecuta el proyecto
	 - Base de datos remota (necesario linkear con proyecto de Astro Studio)
   ```sh
   pnpm run dev
   ```
   - Base de datos local
   ```sh
   pnpm run start
   ```

4. Autenticación mediante twitch (opcional)
   - Accede a la [consola de twitch](https://dev.twitch.tv/), crea un proyecto y obtén tu client id y client secret
   - Genera un hash aleatorio, puedes usar el siguiente comando ```openssl rand -hex 32```
   - Crea un archivo llamado ```.env.local``` y copia el contenido de [.env.demo](.env.demo) en él
   - Reemplaza el texto copiado de demo en ```.env.local``` con tu id, secreto y hash

<p align="right">(<a href="#readme-top">volver arriba</a>)</p> -->
