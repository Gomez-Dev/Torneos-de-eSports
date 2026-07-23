/**
 * Controlador para la verificación de estado de la aplicación (Health Check).
 */
export class HealthController {
  getHealth = (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'Servidor activo',
    });
  };
}

export const healthController = new HealthController();
export default healthController;
