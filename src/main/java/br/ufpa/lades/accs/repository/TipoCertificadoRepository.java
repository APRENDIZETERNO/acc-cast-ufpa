package br.ufpa.lades.accs.repository;
import br.ufpa.lades.accs.domain.TipoCertificado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoCertificado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoCertificadoRepository extends JpaRepository<TipoCertificado, Long> {

}
