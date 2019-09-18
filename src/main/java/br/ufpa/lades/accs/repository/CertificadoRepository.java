package br.ufpa.lades.accs.repository;
import br.ufpa.lades.accs.domain.Certificado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Certificado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CertificadoRepository extends JpaRepository<Certificado, Long> {

}
