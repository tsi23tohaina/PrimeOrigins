package m_tech.backEnd.repository;

import m_tech.backEnd.models.Commande;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends CrudRepository<Commande, Integer> {
    Iterable<Commande> findByUserId(int userId);
}
