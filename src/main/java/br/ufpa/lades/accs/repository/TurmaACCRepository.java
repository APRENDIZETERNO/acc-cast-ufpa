package br.ufpa.lades.accs.repository;
import br.ufpa.lades.accs.domain.TurmaACC;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TurmaACC entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TurmaACCRepository extends JpaRepository<TurmaACC, Long> {

}
